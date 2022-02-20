import { useState, useEffect, useRef } from "react";
import ImageCard from "./components/ImageCard";
import SearchBox from "./components/SearchBox";

import "./css/App.css";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("clap");
  const [offset, setOffset] = useState(0);
  const limit = 1;
  const [totalImages, setTotalImages] = useState(0);

  const footerRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY_THREE}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g&lang=en`
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalImages(data.pagination.total_count);
          console.log(data.data);
          offset === 0
            ? setImages(data.data)
            : setImages((previousData) => [...previousData, ...data.data]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [searchTerm, offset]);

  useEffect(() => {
    let footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("now you can see me!");
            setOffset((currOffset) => currOffset + limit);
          }
        });
      },
      { threshold: 0 }
    );
    if (footerRef.current) footerObserver.observe(footerRef.current);
    return () => {
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
    };
  }, [footerRef, setOffset]);

  return (
    <div className='App mx-auto mt-9 py-2'>
      <SearchBox
        searchTerm={(text) => setSearchTerm(text)}
        setOffset={setOffset}
        limit={limit}
        offset={offset}
        totalImages={totalImages}
      />

      {!isLoading && images.length === 0 && (
        <h1>No images found... try searching for 'Kittens'</h1>
      )}
      {isLoading ? (
        <h1>Loading images...</h1>
      ) : (
        <div className='flex flex-column gap-4 py-2 mx-4'>
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      <footer ref={footerRef} className='flex flex-center py-4 px-4'>
        <img src='images/Poweredby_640px-White_HorizText.png' width='200' />
      </footer>
    </div>
  );
}

export default App;
