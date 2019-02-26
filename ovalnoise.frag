#version 330 compatibility

uniform float uAd=0.5;
uniform float uBd=0.5;
uniform float uTol=0.0;
uniform float uP;
in float vX, vY;
in float vLightIntensity;
in vec3 vMCposition;
in vec3 vECposition;





void

main( )
{


vec3 c0 = vec3(0.388,0.541, 0.9) * vLightIntensity;					
vec3 c1 = vec3(1,1,1) * vLightIntensity;		

float r = sqrt( vX*vX + vY*vY );
float rfrac = fract( uAd*r );
float t = smoothstep( 0.5-uP-uTol, 0.5-uP+uTol, rfrac )-smoothstep( 0.5+uP-uTol, 0.5+uP+uTol, rfrac );

 
  vec3 rgb =  mix(c0,c1,t);
   gl_FragColor = vec4(rgb,1);

	

}





