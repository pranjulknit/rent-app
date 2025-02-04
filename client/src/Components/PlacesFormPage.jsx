import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id)
      .then(response => {
        const { data } = response;
        setTitle(data.title || "");
        setAddress(data.address || "");
        setAddedPhotos(data.photos || []);
        setDescription(data.description || "");
        setPerks(data.perks || []);
        setExtraInfo(data.extraInfo || "");
        setCheckIn(data.checkIn || "");
        setCheckOut(data.checkOut || "");
        setMaxGuests(data.maxGuests || 1);
        setPrice(data.price || 0);
      })
      .catch(error => {
        console.error("Error fetching place data:", error);
      });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests,price
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

  }
  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place')}
        <input type="text" placeholder='Title, for example "My Beautiful Place"' value={title} onChange={ev => setTitle(ev.target.value)} />
        {preInput('Address', 'Address to this Place')}
        <input type="text" placeholder='Address' value={address} onChange={ev => setAddress(ev.target.value)} />
        {preInput('Photos', 'More the photos better the feeling')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Description of Place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks', 'Select all perks')}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra Info', 'House Rules, Instrucutions etc..')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check in and Check out Time', 'Add Check in and Check out Time, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div className='flex flex-col gap-1 items-start'>
            <h3 className='mt-2 -mb-2'>Check in time</h3>
            <input type="text" placeholder='12:00' value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)} />
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <h3 className='mt-2 -mb-2'>Check out time</h3>
            <input type="text" placeholder='18:00' value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)} />
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <h3 className='mt-2 -mb-2'>Max number of guests</h3>
            <input type="number" placeholder='4' value={maxGuests}
              onChange={ev => setMaxGuests(ev.target.value)} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" placeholder="100" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className='primary my-4'>Save</button>
      </form>
    </div>
  )
}

export default PlacesFormPage
