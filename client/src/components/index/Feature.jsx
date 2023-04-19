import "../../css/styles.css"

export default function Feature() {
  return (
    <>
      <div className="feat">
        <div className="box">
          <img src="/images/games.png" alt="Game Logo" />
          <h3>Games</h3>
          <p className="desc">Play games to gain skills not just wasting your time on boring lectures</p>
        </div>
        <div className="box">
          <img src="/images/computer.png" alt="Analytics Logo" />
          <h3>Data Analytics</h3>
          <p className="desc">Take lessons on your desktop or laptop anytime and anywhere 24/7.</p>
        </div>
        <div className="box">
          <img src="/images/skill.png" alt="Skills Logo" />
          <h3>Dialect</h3>
          <p className="desc">Watch highly prepared videos based on DEPED curriciculum using Dialect.</p>
        </div>
      </div>
    </>
  );
}
