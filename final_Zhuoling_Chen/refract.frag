#version 330 compatibility



in vec3 vNs;

in vec3 vEC;

in vec3 vMCposition;

out vec4 fFragColor;



uniform float uMix;

uniform samplerCube uReflectUnit;

uniform samplerCube uRefractUnit;

uniform float uNoiseFreq;

uniform float uNoiseAmp;

uniform sampler3D Noise3;

const vec3 WHITE = vec3( 1.,1.,1.);



vec3 RotateNormal( float angx, float angy, vec3 n )

{

        float cx = cos( angx );

        float sx = sin( angx );

        float cy = cos( angy );

        float sy = sin( angy );



        // rotate about x:

        float yp =  n.y*cx - n.z*sx;    // y'

        n.z      =  n.y*sx + n.z*cx;    // z'

        n.y      =  yp;

        // n.x      =  n.x;



        // rotate about y:

        float xp =  n.x*cy + n.z*sy;    // x'

        n.z      = -n.x*sy + n.z*cy;    // z'

        n.x      =  xp;

        // n.y      =  n.y;



        return normalize( n );

}

void main( )

{

	vec3 Normal = normalize(vNs);

	vec4 nvx = texture3D(Noise3, uNoiseFreq * vMCposition.xyz);

	float angx = nvx.r + nvx.g + nvx.b + nvx.a -2;

	angx *= uNoiseAmp;

    vec4 nvy = texture3D( Noise3, uNoiseFreq*vec3(vMCposition.xy,vMCposition.z+0.5) );

	float angy = nvy.r + nvy.g + nvy.b + nvy.a  -  2.;

	angy *= uNoiseAmp;

	

	Normal=normalize(RotateNormal(angx,angy,Normal));

	

	vec3 vReflectVector = reflect( vEC, Normal );

	vec3 reflectcolor = textureCube(uReflectUnit, vReflectVector ).rgb;

	vec3 vRefractVector = refract( vEC, Normal, 1.0/1.309 );

	vec3 refractcolor = textureCube( uRefractUnit, vRefractVector ).rgb;

	

	refractcolor = mix( refractcolor, WHITE, 0.30 );

	gl_FragColor = vec4( mix( reflectcolor, refractcolor, uMix ),  1. );

}

