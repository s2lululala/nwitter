import React, { useEffect, useState } from 'react';
import { dbService } from 'myBase';
import { collection, addDoc, onSnapshot } from '@firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    onSnapshot(collection(dbService, 'nweets'), (snapshot) => {
      const nweetArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (nweet) {
      try {
        const docRef = await addDoc(
          collection(dbService, 'nweets'), 
          {
            text: nweet, 
            createdAt: Date.now(),
            creatorId: userObj.uid,
      }
        );
        setNweet("");
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  }
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="What's on your mind?" 
          maxLength={120} 
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  );
};
export default Home;