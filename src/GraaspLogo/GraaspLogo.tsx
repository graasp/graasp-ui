import React, { FC } from 'react';

export type GraaspLogoProps = {
  height: number;
  /**
   * sx contains 'fill' which defines a color for the logo
   * */
  sx?: { fill: string };
};

const GraaspLogo: FC<GraaspLogoProps> = ({ height, sx }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      height={height}
    >
      <path
        style={sx}
        d='M172.381 169.33C172.763 169.676 173.977 170.642 175.521 170.569C179.754 170.387 182.702 163.082 183.743 160.55C188.757 148.455 195.088 137.052 201.437 125.741C211.759 107.325 220.866 86.5958 248.551 50.3098C259.584 35.8285 257.45 38.2145 270.634 25.9372C277.451 19.58 284.824 14.0971 293.272 10.5815C302.327 6.81077 311.417 7.32082 318.338 14.8257C325.312 22.3851 322.519 31.5658 319.119 40.1453C316.569 46.6116 313.342 50.6557 307.791 57.7416C303.94 62.6597 302.553 64.2627 299.569 68.0882C295.822 72.879 290.705 80.1103 285.396 90.0378C264.805 129.203 250.199 158.108 247.405 164.52C246.52 166.542 244.186 173.107 244.785 175.457C245.383 177.808 247.567 178.763 249.105 179.33C253.16 180.824 256.252 174.575 258.038 170.787C283.729 116.612 288.621 98.9077 325.346 52.6768C333.534 42.3668 343.855 28.5412 352.997 19.1791C359.485 12.5304 366.823 6.8655 375.132 2.94902C385.367 -1.87809 398.238 -0.712281 403.321 5.95458C405.264 8.50477 406.426 11.0731 406.999 13.6234C408.525 20.4725 406.409 27.0846 402.385 34.3528C394.977 47.7049 385.471 55.8653 382.574 58.434C373.935 66.0846 366.476 77.3052 351.574 99.7458C324.738 140.128 310.896 185.67 316.898 189.912C317.088 190.057 317.817 190.495 318.736 190.476C323.628 190.367 326.976 177.289 327.983 173.645C329.474 168.253 337.836 152.497 354.558 120.983C364.88 101.547 371.368 89.3244 383.372 75.2087C395.22 61.2921 411.249 42.6404 426.81 46.337C433.853 48.0128 440.289 54.2791 442.648 61.6017C443.498 64.2247 445.302 70.7825 440.583 83.4056C434.772 98.9071 425.856 105.756 417.182 115.883C410.868 123.261 405.178 134.591 393.798 157.25C385.576 173.626 375.601 195.647 366.199 222.827C365.436 225.487 363.423 232.955 357.421 236.999C349.529 242.318 339.38 238.875 335.529 237.728C313.065 231.024 289.143 237.618 272.246 242.281C272.246 242.281 236.321 252.19 210.943 284.578C201.333 296.819 195.417 309.825 194.481 311.974C190.907 320.207 186.796 330.627 185.391 345.018C182.615 373.562 193.578 395.31 215.8 411.032C252.28 436.826 307.255 430.796 334.003 403.928C338.357 399.557 347.776 390.103 346.701 378.19C345.885 369.191 339.242 360.357 331.002 356.95C316.482 350.939 307.843 366.277 282.013 367.661C272.558 368.171 257.38 368.991 248.447 357.843C238.142 344.965 244.717 324.527 245.116 323.306C248.256 313.833 253.946 307.913 257.033 305.126C265.863 298.751 284.442 287.184 310.201 284.816C321.685 283.759 344.93 281.574 367.498 296.529C399.815 317.968 405.261 356.769 405.869 361.649C411.75 408.735 379.484 444.091 366.44 458.356C339.726 487.592 309.612 497.557 292.663 502.929C277.605 507.702 231.202 521.637 177.963 501.144C144.188 488.138 123.547 467.371 119.016 462.747C105.069 448.466 93.655 431.58 85.2777 412.837C81.5479 404.476 73.0827 383.965 69.6133 350.43C61.2693 269.789 86.6134 191.643 115.219 148.129C126.321 131.226 147.502 97.5267 156.973 87.3064C162.732 81.0949 169.897 72.3879 188.266 61.5313C193.852 58.2343 199.663 55.2832 206.029 54.6459C210.661 54.1905 214.113 55.5566 216.056 58.2343C218.207 61.2034 218.12 65.3202 217.201 69.5097C213.506 86.3592 196.714 107.379 185.593 126.816C175.359 144.667 167.708 165.067 172.375 169.332L172.381 169.33Z'
      />
    </svg>
  );
};

export default GraaspLogo;
