#version 330 compatibility
uniform float uAd=0.1;
uniform float uBd=0.1;
uniform float uTol=0.0;


in vec2  vST; 
float s= vST.s;
float t= vST.t;


in float vLightIntensity;
const vec3 vColor = vec3(0.388,0.541, 0.94);

vec3 WHITE = vec3( 1., 1., 1. );
void
main( )
{



float Ar = uAd/2.;
float Br = uBd/2.;
int numins = int( s / uAd );
int numint = int( t / uBd );
float sc = numins *uAd + Ar;
float tc = numint *uBd + Br;

vec3 rgb = mix(vColor, WHITE, smoothstep(1 - uTol, 1 + uTol, pow(((vST.s - sc)/Ar), 2) + pow(((vST.t - tc)/Br), 2)));
	
gl_FragColor = vec4(rgb*vLightIntensity, 1.);

}
