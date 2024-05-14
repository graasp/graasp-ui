type H5PProps = {
  size: string | number;
  color?: string;
};

const H5PIcon = ({ size, color }: H5PProps): JSX.Element => {
  const fillColor = color ?? 'currentColor';
  return (
    <svg
      width={size}
      height={size}
      version='1.1'
      viewBox='0 0 1300 1300'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M 95.74,650.3 V 406.99 H 246.59 V 616.24 H 409.61 V 406.99 h 121.75 l -1.307,5.4745 c -2.5392,10.635 -47.071,207.77 -52.49,232.36 -3.0226,13.718 -4.9042,25.533 -4.1815,26.256 0.7227,0.723 30.515,5.3399 66.205,10.26 l 64.891,8.9462 9.8954,-11.577 c 27.937,-32.684 75.421,-33.24 102.84,-1.2047 35.938,41.985 4.7303,107.54 -51.078,107.29 -19.803,-0.087 -35.659,-7.3743 -50.547,-23.231 l -11.784,-12.551 -64.806,9.1844 c -35.644,5.0515 -65.351,9.7291 -66.017,10.395 -2.5401,2.5401 10.5,34.529 20.974,51.451 19.244,31.091 42.436,50.852 76.365,65.064 8.6293,3.6149 16.146,7.0049 16.703,7.5333 0.55756,0.5285 -39.132,0.9609 -88.2,0.9609 h -89.213 v -180.05 h -163.02 v 180.05 h -150.85 z'
        fill={fillColor}
        id='path2'
      />
      <path
        d='m 763.7,891.5 c 1.2712,-1.1737 7.9008,-3.9462 14.732,-6.1611 58.229,-18.879 103.08,-90.97 103.13,-165.77 0.03,-43.193 -12.994,-76.78 -41.351,-106.63 -19.256,-20.271 -39.728,-33.177 -66.904,-42.178 -17.859,-5.9149 -22.878,-6.4619 -60.827,-6.6287 -38.795,-0.17059 -42.686,0.23875 -62.676,6.5945 -11.722,3.727 -22.957,7.4073 -24.967,8.1784 -2.3603,0.90573 -3.2737,0.22951 -2.5802,-1.9102 0.59044,-1.8218 4.5292,-18.367 8.7528,-36.767 l 7.6793,-33.455 h 220.99 v -100.35 l 113.75,1.2124 c 106.04,1.1303 115.07,1.5628 133.21,6.383 50.455,13.403 80.167,40.402 95.377,86.669 5.6162,17.083 6.4237,23.632 6.601,53.528 0.1509,25.428 -0.8842,38.073 -4.0828,49.878 -13.928,51.405 -51.002,87.442 -103.98,101.07 -19.479,5.0099 -65.583,8.1775 -121.05,8.3168 l -41.971,0.1053 v 180.05 h -88.078 c -50.624,0 -87.095,-0.9075 -85.766,-2.1341 z m 261.63,-281.61 c 16.962,-5.037 32.185,-19.719 36.303,-35.012 7.7315,-28.713 -8.2767,-57.752 -36.215,-65.695 -4.8411,-1.3763 -26.594,-3.2014 -48.34,-4.0558 l -39.538,-1.5534 v 113.44 l 37.321,-1.6092 c 22.552,-0.97241 42.524,-3.1542 50.468,-5.5133 z'
        fill={fillColor}
        id='path3'
      />
    </svg>
  );
};
export default H5PIcon;