import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "./customHook/useDebounce";
import { getSearchPostalCode } from "./reducer/postalLookupReducer";

const PostalLookUp = () => {
    const [search, setSearch] = useState("");
    const debouncedSearchTerm = useDebounce(search, 800);
    const { postalCodeDetail, error } = useSelector((state) => state.postallookup);
    const dispatch = useDispatch();

    useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(getSearchPostalCode(debouncedSearchTerm));
        }
    }, [debouncedSearchTerm]);

    return (
        <>
            <div className="main-wrapper">
                <div className="postal-wrap">
                    <label htmlFor="search">Search By postalcode (US) : </label>
                    <input
                        className="search-text"
                        type="text"
                        placeholder="Search By Id"
                        name="search"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <div className="card-container">
                    {error !== '' ? (
                        <div className="card" key="no-data">
                            <div>
                                <label htmlFor="province">{error} </label>
                            </div>
                        </div>
                    ) :
                        (
                            <div className="card" key="no-data">
                                <div>
                                    <label htmlFor="post-code">post code: </label>
                                    <span>{postalCodeDetail['post code']}</span>
                                </div>
                                <div>
                                    <label htmlFor="country">country: </label>
                                    <span>{postalCodeDetail['country']}</span>
                                </div>
                                <div>
                                    <label htmlFor="place-name">Place Name: </label>
                                    <span>{postalCodeDetail?.places?.[0]?.['place name']}</span>
                                </div>
                                <div>
                                    <label htmlFor="state">State: </label>
                                    <span>{postalCodeDetail?.places?.[0]?.['state']}</span>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
};

export default PostalLookUp;