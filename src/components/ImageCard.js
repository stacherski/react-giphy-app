const ImageCard = ({ image }) => {
  return (
    <div className='card box-shadow-1'>
      <video
        className='w100'
        onMouseOver={(e) => e.target.play()}
        onMouseOut={(e) => e.target.pause()}
        onClick={(e) => e.target.play()}
        id={image.id}
        src={image.images.original.mp4}
        muted
        loop></video>
      <div className='card__header px-4 py-4 text-700'>{image.title}</div>
    </div>
  );
};

export default ImageCard;
