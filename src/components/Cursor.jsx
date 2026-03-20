import { useEffect, useState } from 'react'

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setPosition({ x: mouseX, y: mouseY })
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX - 15) * 0.1
      followerY += (mouseY - followerY - 15) * 0.1
      setFollowerPosition({ x: followerX, y: followerY })
      requestAnimationFrame(animateFollower)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationId = requestAnimationFrame(animateFollower)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <div
        className="cursor"
        style={{
          left: position.x - 5,
          top: position.y - 5
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: followerPosition.x,
          top: followerPosition.y
        }}
      />
    </>
  )
}

export default Cursor