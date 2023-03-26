function VideoPlayer({ src }) {
  return (
    <video controls autoPlay>
        <source src={src} type="video/mp4" />
    </video>
  )
}

export default VideoPlayer;