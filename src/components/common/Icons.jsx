import React from 'react';

// Exact Logo.svg from Resources/Logo.svg with adaptive Dark/Light wordmark color
export const LunglowLogo = ({ className = "h-10 sm:h-12 w-auto", onClick, isLight = false }) => (
  <svg
    onClick={onClick}
    className={`${className} ${onClick ? 'cursor-pointer' : ''} select-none`}
    viewBox="0 0 358 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.90341 66V19.4545H13.3352V58.9318H33.8352V66H4.90341ZM63.0398 51.3182V31.0909H71.267V66H63.2898V59.7955H62.9261C62.1383 61.75 60.8428 63.3485 59.0398 64.5909C57.2519 65.8333 55.0473 66.4545 52.4261 66.4545C50.1383 66.4545 48.1155 65.947 46.358 64.9318C44.6155 63.9015 43.2519 62.4091 42.267 60.4545C41.2822 58.4848 40.7898 56.1061 40.7898 53.3182V31.0909H49.017V52.0455C49.017 54.2576 49.6231 56.0152 50.8352 57.3182C52.0473 58.6212 53.6383 59.2727 55.608 59.2727C56.8201 59.2727 57.9943 58.9773 59.1307 58.3864C60.267 57.7955 61.1989 56.9167 61.9261 55.75C62.6686 54.5682 63.0398 53.0909 63.0398 51.3182ZM87.9545 45.5455V66H79.7273V31.0909H87.5909V37.0227H88C88.803 35.0682 90.0833 33.5152 91.8409 32.3636C93.6136 31.2121 95.803 30.6364 98.4091 30.6364C100.818 30.6364 102.917 31.1515 104.705 32.1818C106.508 33.2121 107.902 34.7045 108.886 36.6591C109.886 38.6136 110.379 40.9848 110.364 43.7727V66H102.136V45.0455C102.136 42.7121 101.53 40.8864 100.318 39.5682C99.1212 38.25 97.4621 37.5909 95.3409 37.5909C93.9015 37.5909 92.6212 37.9091 91.5 38.5455C90.3939 39.1667 89.5227 40.0682 88.8864 41.25C88.2652 42.4318 87.9545 43.8636 87.9545 45.5455ZM133.909 79.8182C130.955 79.8182 128.417 79.4167 126.295 78.6136C124.174 77.8258 122.47 76.7652 121.182 75.4318C119.894 74.0985 119 72.6212 118.5 71L125.909 69.2045C126.242 69.8864 126.727 70.5606 127.364 71.2273C128 71.9091 128.856 72.4697 129.932 72.9091C131.023 73.3636 132.394 73.5909 134.045 73.5909C136.379 73.5909 138.311 73.0227 139.841 71.8864C141.371 70.7652 142.136 68.9167 142.136 66.3409V59.7273H141.727C141.303 60.5758 140.682 61.447 139.864 62.3409C139.061 63.2348 137.992 63.9848 136.659 64.5909C135.341 65.197 133.682 65.5 131.682 65.5C129 65.5 126.568 64.8712 124.386 63.6136C122.22 62.3409 120.492 60.447 119.205 57.9318C117.932 55.4015 117.295 52.2348 117.295 48.4318C117.295 44.5985 117.932 41.3636 119.205 38.7273C120.492 36.0758 122.227 34.0682 124.409 32.7045C126.591 31.3258 129.023 30.6364 131.705 30.6364C133.75 30.6364 135.432 30.9848 136.75 31.6818C138.083 32.3636 139.144 33.1894 139.932 34.1591C140.72 35.1136 141.318 36.0152 141.727 36.8636H142.182V31.0909H150.295V66.5682C150.295 69.553 149.583 72.0227 148.159 73.9773C146.735 75.9318 144.788 77.3939 142.318 78.3636C139.848 79.3333 137.045 79.8182 133.909 79.8182ZM133.977 59.0455C135.72 59.0455 137.205 58.6212 138.432 57.7727C139.659 56.9242 140.591 55.7045 141.227 54.1136C141.864 52.5227 142.182 50.6136 142.182 48.3864C142.182 46.1894 141.864 44.2652 141.227 42.6136C140.606 40.9621 139.682 39.6818 138.455 38.7727C137.242 37.8485 135.75 37.3864 133.977 37.3864C132.144 37.3864 130.614 37.8636 129.386 38.8182C128.159 39.7727 127.235 41.0833 126.614 42.75C125.992 44.4015 125.682 46.2803 125.682 48.3864C125.682 50.5227 125.992 52.3939 126.614 54C127.25 55.5909 128.182 56.8333 129.409 57.7273C130.652 58.6061 132.174 59.0455 133.977 59.0455ZM166.955 19.4545V66H158.727V19.4545H166.955ZM190.642 66.6818C187.233 66.6818 184.278 65.9318 181.778 64.4318C179.278 62.9318 177.339 60.8333 175.96 58.1364C174.597 55.4394 173.915 52.2879 173.915 48.6818C173.915 45.0758 174.597 41.9167 175.96 39.2045C177.339 36.4924 179.278 34.3864 181.778 32.8864C184.278 31.3864 187.233 30.6364 190.642 30.6364C194.051 30.6364 197.006 31.3864 199.506 32.8864C202.006 34.3864 203.938 36.4924 205.301 39.2045C206.68 41.9167 207.369 45.0758 207.369 48.6818C207.369 52.2879 206.68 55.4394 205.301 58.1364C203.938 60.8333 202.006 62.9318 199.506 64.4318C197.006 65.9318 194.051 66.6818 190.642 66.6818ZM190.688 60.0909C192.536 60.0909 194.081 59.5833 195.324 58.5682C196.566 57.5379 197.491 56.1591 198.097 54.4318C198.718 52.7045 199.028 50.7803 199.028 48.6591C199.028 46.5227 198.718 44.5909 198.097 42.8636C197.491 41.1212 196.566 39.7348 195.324 38.7045C194.081 37.6742 192.536 37.1591 190.688 37.1591C188.794 37.1591 187.218 37.6742 185.96 38.7045C184.718 39.7348 183.786 41.1212 183.165 42.8636C182.559 44.5909 182.256 46.5227 182.256 48.6591C182.256 50.7803 182.559 52.7045 183.165 54.4318C183.786 56.1591 184.718 57.5379 185.96 58.5682C187.218 59.5833 188.794 60.0909 190.688 60.0909ZM220.557 66L210.693 31.0909H219.08L225.216 55.6364H225.534L231.807 31.0909H240.102L246.375 55.5H246.716L252.761 31.0909H261.17L251.284 66H242.716L236.17 42.4091H235.693L229.148 66H220.557Z"
      fill={isLight ? "#142412" : "white"}
    />
    <path
      d="M305.307 39.424C304.789 30.6488 302.709 26.1051 299.068 25.7929C293.188 25.2887 284.174 34.9006 281.502 48.4087C278.83 61.9168 280.149 71.5928 283.646 72.2461C287.142 72.8993 292.223 69.0933 294.634 69.0933C297.044 69.0933 305.398 70.9358 305.398 67.5983C305.398 65.9538 305.398 61.9628 305.398 53.2493"
      stroke="#5FB032"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M325.458 39.6148C325.957 30.7145 328.041 26.1072 331.709 25.7929C337.589 25.2887 346.602 34.9006 349.275 48.4087C351.947 61.9168 350.627 71.5928 347.131 72.2461C343.634 72.8993 338.553 69.0933 336.143 69.0933C333.733 69.0933 325.378 70.9358 325.378 67.5983C325.378 65.9577 325.378 61.9264 325.378 53.2493"
      stroke="#5FB032"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M309.4 8.85413V35.2583C309.323 39.3162 305.937 41.345 299.242 41.345"
      stroke="#5FB032"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M321.329 8.85413V35.2583C321.406 39.3162 324.792 41.345 331.487 41.345"
      stroke="#5FB032"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M299.562 53.2496C306.567 53.2496 311.879 51.5863 315.5 48.2594C319.147 51.5863 324.476 53.2496 331.488 53.2496"
      stroke="#5FB032"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Exact Home page lung icon.svg with adaptive Light/Dark base stroke and dynamic two-tone fill
export const HomeLungIcon = ({ fillRatio = 0.5, statusColor = "#5FB032", isLight = false, className = "w-48 h-48 sm:w-60 sm:h-60" }) => {
  const clamped = Math.max(0, Math.min(1, fillRatio));
  const stopPercent = Math.round((1 - clamped * 0.86) * 100);
  const topStrokeColor = isLight ? "#1B2E19" : "#FFFFFF";
  return (
    <svg className={className} viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lungStrokeSplit" x1="0" y1="0" x2="0" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset={`${stopPercent}%`} stopColor={topStrokeColor} />
          <stop offset={`${stopPercent}%`} stopColor={statusColor} />
        </linearGradient>
      </defs>
      <path
        d="M171.039 208.716C168.297 162.259 157.287 138.203 138.008 136.551C106.877 133.882 59.1586 184.768 45.0117 256.282C30.8649 327.795 37.8508 379.021 56.3622 382.479C74.8736 385.938 101.771 365.788 114.533 365.788C127.294 365.788 171.523 375.543 171.523 357.874C171.523 349.167 171.523 328.039 171.523 281.908"
        stroke="url(#lungStrokeSplit)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M277.722 209.725C280.363 162.607 291.393 138.215 310.812 136.551C341.943 133.882 389.661 184.768 403.808 256.282C417.955 327.795 410.968 379.021 392.457 382.479C373.946 385.938 347.048 365.788 334.287 365.788C321.526 365.788 277.296 375.543 277.296 357.874C277.296 349.188 277.296 327.846 277.296 281.908"
        stroke="url(#lungStrokeSplit)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M192.709 46.875V186.662C192.301 208.145 174.375 218.886 138.931 218.886"
        stroke="url(#lungStrokeSplit)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M255.862 46.875V186.662C256.27 208.145 274.196 218.886 309.64 218.886"
        stroke="url(#lungStrokeSplit)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M140.625 281.91C177.706 281.91 205.831 273.104 225 255.491C244.307 273.104 272.522 281.91 309.643 281.91"
        stroke="url(#lungStrokeSplit)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SmokingCigaretteIcon = ({ className = "w-28 h-20 sm:w-36 sm:h-28" }) => (
  <svg className={className} viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="92" width="122" height="24" rx="12" fill="#CABA3A" />
    <rect x="142" y="92" width="9" height="24" rx="4.5" fill="#CABA3A" />
    <rect x="157" y="92" width="9" height="24" rx="4.5" fill="#CABA3A" />
    <path
      d="M146 82V74C146 66 138 64 130 64C116 64 108 55 108 42C108 29 118 22 128 22"
      stroke="#CABA3A"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <path
      d="M161 82V62C161 52 153 47 146 45C155 41 161 33 161 23C161 11 151 5 140 5"
      stroke="#CABA3A"
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
);

export const DollarCircleIcon = ({ className = "w-14 h-14 sm:w-16 sm:h-16" }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="36" fill="#CABA3A" />
    <text
      x="40"
      y="53"
      textAnchor="middle"
      fill="#1A1A1A"
      fontSize="42"
      fontWeight="500"
      fontFamily="Inter, sans-serif"
    >
      $
    </text>
  </svg>
);

export const FlameIcon = ({ className = "w-9 h-9 sm:w-11 sm:h-11", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.5 2C19.5 2 22.8 8.5 20.2 14.8C18.5 18.8 14.5 19.5 14.5 19.5C14.5 19.5 13.8 14.8 10.5 12C6.5 16.5 3 22.5 3 29C3 37.3 9.7 43 18 43C26.3 43 33 37.3 33 29C33 18.5 24.5 9.5 19.5 2Z"
      fill={color}
    />
  </svg>
);

export const TrophyIcon = ({ className = "w-9 h-9 sm:w-11 sm:h-11", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 6H33V18C33 24.0751 28.0751 29 22 29C15.9249 29 11 24.0751 11 18V6Z"
      fill={color}
    />
    <path
      d="M11 9H6V15C6 18.866 8.68629 22 12 22"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33 9H38V15C38 18.866 35.3137 22 32 22"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="19" y="28" width="6" height="8" fill={color} />
    <rect x="13" y="35" width="18" height="4.5" rx="2" fill={color} />
  </svg>
);

export const NoSmokingIcon = ({ className = "w-10 h-10 sm:w-12 sm:h-12", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="19" stroke={color} strokeWidth="4" />
    <line x1="11" y1="11" x2="37" y2="37" stroke={color} strokeWidth="4" />
    <rect x="12" y="23" width="18" height="4.5" rx="1.5" fill={color} />
    <rect x="32" y="23" width="3" height="4.5" rx="1" fill={color} />
    <path d="M33 19C35 19 36 17.5 36 16C36 14.5 34.5 13.5 33 13.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const NavHomeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L4 9.5V20.5C4 21.05 4.45 21.5 5 21.5H9.5V15C9.5 14.45 9.95 14 10.5 14H13.5C14.05 14 14.5 14.45 14.5 15V21.5H19C19.55 21.5 20 21.05 20 20.5V9.5L12 3Z" />
  </svg>
);

export const NavTimerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="9" y1="2.5" x2="15" y2="2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="18" y1="5.5" x2="20" y2="7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="13.5" r="8" fill="currentColor" />
    <line x1="12" y1="10" x2="12" y2="13.8" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const NavCalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="3" x2="8" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="3" x2="16" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="13.2" r="1.1" fill="currentColor" />
    <circle cx="12" cy="13.2" r="1.1" fill="currentColor" />
    <circle cx="16" cy="13.2" r="1.1" fill="currentColor" />
    <circle cx="8" cy="16.8" r="1.1" fill="currentColor" />
    <circle cx="12" cy="16.8" r="1.1" fill="currentColor" />
    <circle cx="16" cy="16.8" r="1.1" fill="currentColor" />
  </svg>
);

export const NavPiggyIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.5 13.5C22.5 10.5 19.8 8 15.8 8H11.5C7.8 8 5.5 10.5 5.5 13.8C5.5 15.8 6.8 17.6 8.5 18.5L7.8 21.5H10.5L11.2 19.5H15.8L16.5 21.5H19.2L18.5 18.5C20.2 17.8 21.5 16.8 22 15.5H24V12.5H22.3C22.4 12.8 22.5 13.1 22.5 13.5Z"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="9.5" r="4.5" fill="#111111" stroke="currentColor" strokeWidth="1.8" />
    <text x="14" y="12.2" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="700">$</text>
    <circle cx="19" cy="12.5" r="1" fill="currentColor" />
  </svg>
);

export const NavProfileCardIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="22" height="16" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="8.5" cy="9.2" r="2.2" fill="currentColor" />
    <path d="M5 15.5C5 13.6 6.5 12.4 8.5 12.4C10.5 12.4 12 13.6 12 15.5" fill="currentColor" />
    <line x1="14.5" y1="8.5" x2="20.5" y2="8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="14.5" y1="12.5" x2="20.5" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const NavChatIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 26 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 6C6.36 6 3 8.91 3 12.5C3 14.08 3.65 15.53 4.74 16.66L3.5 20L7.2 18.45C8.22 18.8 9.33 19 10.5 19C14.64 19 18 16.09 18 12.5C18 8.91 14.64 6 10.5 6Z" />
    <path d="M16.5 3C13.5 3 10.95 4.65 10.05 7.02C10.2 7 10.35 7 10.5 7C15.19 7 19 10.36 19 14.5C19 15.05 18.93 15.58 18.8 16.1L22.2 17.5L21.15 14.55C22.3 13.45 23 12.05 23 10.5C23 6.36 20.09 3 16.5 3Z" opacity="0.85" />
  </svg>
);

export const NavLogoutIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H11"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M9 12H20M20 12L16.5 8.5M20 12L16.5 15.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TrashCanIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
  </svg>
);

export const PencilIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
  </svg>
);

export const CameraIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3H9ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18ZM12 10C10.34 10 9 11.34 9 13C9 14.66 10.34 16 12 16C13.66 16 15 14.66 15 13C15 11.34 13.66 10 12 10Z" />
  </svg>
);

export const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const ArrowUpRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NumberStepperChevrons = ({ onIncrement, onDecrement }) => (
  <div className="flex flex-col items-center justify-center gap-1 select-none shrink-0">
    <button
      type="button"
      onClick={onIncrement}
      aria-label="Increase value"
      className="text-[#CABA3A] hover:brightness-125 transition p-0.5 leading-none"
    >
      <svg className="w-3.5 h-2.5" viewBox="0 0 14 9" fill="none">
        <path d="M1.5 7.5L7 2L12.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <button
      type="button"
      onClick={onDecrement}
      aria-label="Decrease value"
      className="text-[#CABA3A] hover:brightness-125 transition p-0.5 leading-none"
    >
      <svg className="w-3.5 h-2.5" viewBox="0 0 14 9" fill="none">
        <path d="M1.5 1.5L7 7L12.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
);


export const NavBlogIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2" />
    <line x1="7.5" y1="8.5" x2="16.5" y2="8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="7.5" y1="12.5" x2="16.5" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="7.5" y1="16.5" x2="12.5" y2="16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const NavAdminShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3L4.5 6.2V11.8C4.5 16.5 7.7 20.6 12 22C16.3 20.6 19.5 16.5 19.5 11.8V6.2L12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9.2 12.2L11.1 14.1L15.2 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FlagReportIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 21V4M5 4H19L16 9L19 14H5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UsersGroupIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path d="M3 19.5C3 16.5 5.6 14.5 9 14.5C12.4 14.5 15 16.5 15 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16.5" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16.5 14.5C19.2 14.5 21 16.2 21 18.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Admin Dashboard & User Challenges/Requests icons
export const ChartLineIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4V19.5H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 15L10.2 10.8L13 13.6L18.6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18.6" cy="8" r="1.6" fill="currentColor" />
  </svg>
);

export const ChartBarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="3.6" height="8" rx="1.4" fill="currentColor" />
    <rect x="10.2" y="7" width="3.6" height="13" rx="1.4" fill="currentColor" />
    <rect x="16.4" y="3.5" width="3.6" height="16.5" rx="1.4" fill="currentColor" />
  </svg>
);

export const InboxIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 13L6.4 5.6C6.75 4.55 7.7 3.9 8.8 3.9H15.2C16.3 3.9 17.25 4.55 17.6 5.6L20 13V17.5C20 18.9 18.9 20 17.5 20H6.5C5.1 20 4 18.9 4 17.5V13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M4 13H9.2C9.5 15 10.6 16 12 16C13.4 16 14.5 15 14.8 13H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V14M12 14L8 10M12 14L16 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 17.5V18.5C4.5 19.6 5.4 20.5 6.5 20.5H17.5C18.6 20.5 19.5 19.6 19.5 18.5V17.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
    <path d="M8.5 12.3L11 14.8L15.8 9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SendIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 3.5L10 14M20.5 3.5L13.8 20.5L10 14M20.5 3.5L3.5 10.2L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SparklesIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5L13.9 8.1L19.5 10L13.9 11.9L12 17.5L10.1 11.9L4.5 10L10.1 8.1L12 2.5Z" />
    <path d="M19 15.5L19.9 18.1L22.5 19L19.9 19.9L19 22.5L18.1 19.9L15.5 19L18.1 18.1L19 15.5Z" />
    <path d="M5 16L5.7 18L7.7 18.7L5.7 19.4L5 21.4L4.3 19.4L2.3 18.7L4.3 18L5 16Z" />
  </svg>
);

export const PauseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="6.5" y="4.5" width="4" height="15" rx="1.5" />
    <rect x="13.5" y="4.5" width="4" height="15" rx="1.5" />
  </svg>
);

export const PlayIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.5V18.5C8 19.4 8.9 20 9.7 19.6L19.7 14.6C20.5 14.2 20.5 13.1 19.7 12.7L9.7 4.4C8.9 4 8 4.6 8 5.5Z" />
  </svg>
);

export const MegaphoneIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5 5V5C20.2 5 21.5 7.2 21.5 10C21.5 12.8 20.2 15 18.5 15V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M18.5 5.5C18.5 5.5 13 5 8.5 6.5L4 8V12L8.5 13.5C13 15 18.5 14.5 18.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M7.5 14.5L8.5 19.5H11L10.2 14.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 12C2.5 12 6 5.5 12 5.5C18 5.5 21.5 12 21.5 12C21.5 12 18 18.5 12 18.5C6 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
