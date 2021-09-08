import React, { useState } from "react";
import { dbService } from 'myBase';
import { doc, collection, deleteDoc, updateDoc } from "@firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDelClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(collection(dbService, 'nweets'),`${nweetObj.id}`));
    }
  }
  const toggleEditing = () => {
    setEditing(!editing);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(collection(dbService, 'nweets'),`${nweetObj.id}`), { text: newNweet });
    setEditing(false);
  }
  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setNewNweet(value);
  }
  return(
    <div>
      {
        editing ? 
        <>
          <form onSubmit={onSubmit}>
            <input 
              type="text"
              placeholder="Edit nweet"
              value={newNweet} 
              required 
              onChange={onChange}
            />
            <input 
              type="submit"
              value="Update"
            />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
        :
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && 
          <>
            <button onClick={onDelClick}>Delete</button>
            <button onClick={toggleEditing}>Edit</button>
          </>}
        </>
      }
    </div>
  )
};

export default Nweet;