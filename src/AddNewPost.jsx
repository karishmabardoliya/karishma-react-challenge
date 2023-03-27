import { useEffect, useState } from "react";

const AddNewPost = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        setTitle((props.data && props.data.title) ? props.data.title : '');
        setBody((props.data && props.data.body) ? props.data.body : '');
    }, []);

    const updateValue = (event) => {
        if (event.target.name === 'title') {
            setTitle(event.target.value);
        } else {
            setBody(event.target.value);
        }
    }

    const addOrUpdate = () => {
        props.submitData({title, body})
    }

    return (
        <>
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="popup-header">
                        <h1 className="popup-title">{props?.header}</h1>
                        <button onClick={props.closePopup}>&#x78;</button>
                    </div>
                    <div className="popup-body">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <textarea type="text" key="title" name="title" rows={2}
                                value={title} onChange={(e) => updateValue(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <textarea type="text" key="body" name="body" rows={2}
                                value={body} onChange={(e) => updateValue(e)} />
                        </div>
                        <div className="popup-buttons">
                            <button onClick={addOrUpdate} className="button-submit">Submit</button>
                            <button onClick={props.closePopup} className="button-cancle">Cancle</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewPost;