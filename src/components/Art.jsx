export default function Art() {
  return (
    <svg
      className="art"
      viewBox="0 0 650 350"
      aria-label="Illustration of the Mediterranean coast"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f7d7b2" />
          <stop offset="1" stopColor="#e9a18a" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#60c5c0" />
          <stop offset="1" stopColor="#2f8d9b" />
        </linearGradient>
      </defs>
      <circle cx="500" cy="95" r="56" fill="url(#sky)" />
      <path
        d="M0 220L90 155 160 190 245 90 330 175 420 120 520 190 590 140 650 200V350H0Z"
        fill="#5d7887"
      />
      <path
        d="M0 245L110 190 200 225 280 155 360 220 470 175 560 230 650 195V350H0Z"
        fill="#344c63"
      />
      <path
        d="M0 240Q130 215 250 245T500 235T650 245V350H0Z"
        fill="url(#sea)"
      />
      <g fill="#f2d8b3">
        <path d="M380 230V175H430V230Z" />
        <path d="M433 230V155H480V230Z" />
        <path d="M483 230V184H530V230Z" />
        <path d="M534 230V165H582V230Z" />
        <path d="M585 230V192H630V230Z" />
      </g>
      <g fill="#c66f58">
        <path d="M372 175L405 147 438 175Z" />
        <path d="M425 155L456 128 488 155Z" />
        <path d="M475 184L507 154 538 184Z" />
        <path d="M526 165L558 135 590 165Z" />
        <path d="M578 192L607 166 636 192Z" />
      </g>
      <path d="M0 315Q140 290 280 318T560 315T650 310V350H0Z" fill="#e6d2af" />
    </svg>
  );
}
