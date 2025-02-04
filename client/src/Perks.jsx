

const Perks = ({selected,onChange}) => {
    function handleCbClick(ev) {
        const {checked,name} = ev.target
        if (checked){
            onChange([...selected,name])
        } else {
            onChange([...selected.filter(selectedName => selectedName!== name)])
        }
    }
    return (
        <>
            <label className='cursor-pointer border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" onChange={handleCbClick} checked={selected.includes("wifi")} name="wifi" id="" />
                <i className="fa-solid fa-wifi"></i>
                <span>Wifi</span>
            </label>
            <label className='cursor-pointer border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" onChange={handleCbClick} checked={selected.includes("parking")} name="parking" id="" />
                <i className="fa-solid fa-car"></i>
                <span>Parking</span>
            </label>
            <label className='cursor-pointer border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" onChange={handleCbClick} checked={selected.includes("tv")} name="tv" id="" />
                <i className="fa-solid fa-tv"></i>
                <span>TV</span>
            </label>
            <label className='cursor-pointer border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" onChange={handleCbClick} checked={selected.includes("pets")} name="pets" id="" />
                <i className="fa-solid fa-dog"></i>
                <span>Pets</span>
            </label>
            <label className='cursor-pointer border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" onChange={handleCbClick} checked={selected.includes("cctv")} name="cctv" id="" />
                <i className="fa-solid fa-camera"></i>
                <span>CCTV</span>
            </label>
            <label className='cursor-pointer border p-4 flex rounded-2xl gap-2 items-center'>
                <input type="checkbox" onChange={handleCbClick} checked={selected.includes("entry")} name="entry" id="" />
                <i className="fa-solid fa-door-open"></i>
                <span>Private Entry</span>
            </label>
        </>
    )
}

export default Perks
