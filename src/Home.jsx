import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewPost from "./AddNewPost";
import {
    addNewPost,
    deletePostById,
    fetchAllPosts,
    getSearchPost,
    updatePostById,
} from "./reducer/postReducer";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    const [showPopUp, setPopUp] = useState(false);
    const [popUpHeader, setPopUpHeader] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [search, setSearchString] = useState("");

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, []);

    const addPost = () => {
        setPopUpHeader("Add New Post");
        setPopUpData({});
        setPopUp(true);
    };

    const submitData = ({ title, body }) => {
        if (title == '') {
            toast.error("Please add Title!");
            return;
        } else if (body == '') {
            toast.error("Please add Body!");
            return;
        }
        if (Object.keys(popUpData).length === 0) {
            // add post
            dispatch(addNewPost({ title, body })).then(() => {
                setPopUp(false);
                toast.success("Post Added successfully!");
                dispatch(fetchAllPosts());
            })
                .catch(() => {
                    setPopUp(false);
                    toast.error("Oppss..! Somthing went wrong.");
                })
        } else {
            // edit post
            dispatch(updatePostById({ title, body, id: popUpData.id })).then(() => {
                setPopUp(false);
                toast.success("Post updated successfully!");
                dispatch(fetchAllPosts());
            })
                .catch(() => {
                    setPopUp(false);
                    toast.error("Oppss..! Somthing went wrong.");
                })
        }
    };

    const closePopUp = () => {
        setPopUp(false);
    };

    const editRecord = (data) => {
        setPopUpHeader("Edit Post");
        setPopUpData(data);
        setPopUp(true);
    };

    const searchRecord = (e) => {
        const { value } = e.target;
        setSearchString(value);
        if (value) {
            dispatch(getSearchPost(value));
        } else {
            dispatch(fetchAllPosts());
        }
    };

    const deleteRecord = (id) => {
        dispatch(deletePostById(id))
            .then(() => {
                toast.success("Post deleted successfully!");
                dispatch(fetchAllPosts());
            })
            .catch(() => {
                toast.error("Oppss..! Somthing went wrong.");
            });
    };

    return (
        <>
            {state.loading ? (<div>
                <span class="loader"></span>
            </div>) : ''}

            <div className="main-wrapper">
                <div className="add-post-wrap">
                    <button className="add-new-button" onClick={addPost}>
                        ADD POST
                    </button>
                    {showPopUp ? (
                        <AddNewPost
                            closePopup={closePopUp}
                            header={popUpHeader}
                            data={popUpData}
                            submitData={submitData}
                        />
                    ) : (
                        ""
                    )}
                    <input
                        className="search-text"
                        type="text"
                        placeholder="Search By Id"
                        name="search"
                        value={search}
                        onChange={(e) => {
                            searchRecord(e);
                        }}
                    />
                </div>
                <table>
                    <caption>List of Data</caption>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Body</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state?.post?.posts?.map((data) => (
                            <tr key={data.id}>
                                <td scope="row" data-label="Id">
                                    {data.id}
                                </td>
                                <td data-label="Title">{data.title}</td>
                                <td data-label="Body">{data.body}</td>
                                <td data-aria-label="Edit">
                                    <button
                                        className="table-button"
                                        onClick={() => editRecord(data)}
                                    >
                                        &#x270E;
                                    </button>
                                </td>
                                <td data-aria-label="Delete">
                                    <button
                                        className="table-button"
                                        onClick={() => deleteRecord(data.id)}
                                    >
                                        &#10006;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;