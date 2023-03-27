import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUniversities, fetchAllCountries } from "./reducer/universitiesReducer";
import "./App.css";
import { useState } from "react";

const Universities = () => {
    const dispatch = useDispatch();
    const { universities, countries } = useSelector(state => state.university);
    const [country, setCountry] = useState('Canada')

    useEffect(() => {
        dispatch(fetchAllCountries());
        dispatch(fetchAllUniversities(country));
    }, [])

    const onOptionChangeHandler = (event) => {
        const { value } = event.target;
        setCountry(value);
        dispatch(fetchAllUniversities(value));
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="dropdown-wrap">
                    <label htmlFor="countryList" className="dropdown-label">Sort By country</label>
                    <select className="select-dropdown" onChange={onOptionChangeHandler}
                        value={country} name="countryList">
                        <option value="">Select country</option>
                        {countries?.data?.map((option, index) => {
                            return <option value={option.name} key={index} >
                                {option.name}
                            </option>
                        })}
                    </select>
                </div>
                <div className="card-container">
                    {(universities?.data?.length > 0) ? universities?.data?.map((item, index) => (
                        <div className="card" key={index}>
                            <div>
                                <label htmlFor="province">Provice: </label>
                                <span>{item['state-province']}</span>
                            </div>
                            <div>
                                <label htmlFor="province">University Name: </label>
                                <span>{item['name']}</span>
                            </div>
                            <div>
                                <label htmlFor="province">Country: </label>
                                <span>{item['country']}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="card" key="no-data">
                            <div>
                                <label htmlFor="province">No result found </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Universities;