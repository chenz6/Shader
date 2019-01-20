#version 330 compatibility

uniform float uAd=0.5;
uniform float uBd=0.5;
uniform float uTol=0.0;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uAlpha;
uniform bool uUseChromaDepth;
uniform float uChromaRed;
uniform float uChromaBlue;

in vec2  vST; 
in float vLightIntensity;
in vec3 vMCposition;
in vec3 vECposition;
float s= vST.s;
float t= vST.t;
float Z= vECposition.z;

uniform sampler3D Noise3;



vec3
Rainbow( float t )
{
	t = clamp( t, 0., 1. );

	float r = 1.;
	float g = 0.0;
	float b = 1.  -  6. * ( t - (5./6.) );

        if( t <= (5./6.) )
        {
                r = 6. * ( t - (4./6.) );
                g = 0.;
                b = 1.;
        }

        if( t <= (4./6.) )
        {
                r = 0.;
                g = 1.  -  6. * ( t - (3./6.) );
                b = 1.;
        }

        if( t <= (3./6.) )
        {
                r = 0.;
                g = 1.;
                b = 6. * ( t - (2./6.) );
        }

        if( t <= (2./6.) )
        {
                r = 1.  -  6. * ( t - (1./6.) );
                g = 1.;
                b = 0.;
        }

        if( t <= (1./6.) )
        {
                r = 1.;
                g = 6. * t;
        }

	return vec3( r, g, b );
}

void

main( )
{
vec4 c0 = vec4(vec3(0.388,0.541, 0.9) * vLightIntensity, 1.);					
vec4 c1 = vec4(vec3(1,1,1) * vLightIntensity, uAlpha);		

// read the glman noise texture and convert it to a range of [-1.,+1.]:


vec3 stp = uNoiseFreq * vMCposition; 
vec4 nv  = texture3D( Noise3, uNoiseFreq*vMCposition );

float n = nv.r + nv.g + nv.b + nv.a;    //  1. -> 3.
n = n - 2.;                             // -1. -> 1.
n = n *uNoiseAmp;
float Ar = uAd/2.;
float Br = uBd/2.;
int numins = int( s / uAd );
int numint = int( t / uBd );

// determine the color based on the noise-modified (s,t):

float sc = float(numins) * uAd  +  Ar;
float ds = s - sc;                   // wrt ellipse center
float tc = float(numint) * uBd  +  Br;
float dt = t - tc;                   // wrt ellipse center

float oldDist = sqrt( ds*ds + dt*dt );
float newDist = n+oldDist;
float scale = newDist / oldDist;        // this could be < 1., = 1., or > 1.

ds *= scale;                            // scale by noise factor
ds /= Ar;                               // ellipse equation

dt *= scale;                            // scale by noise factor
dt /= Br;                               // ellipse equation

float d = ds*ds + dt*dt;

if( uUseChromaDepth )
	{
		float t = (2./3.) * ( Z - uChromaRed ) / ( uChromaBlue - uChromaRed );
		t = clamp( t, 0., 2./3. );
		c0 = vec4(Rainbow( t ), 1.);
	}
	
	
		vec4 rgb = mix(c0,c1, smoothstep(1 - uTol, 1 + uTol,d));

       if(uAlpha == 0.) 
       {
			if(rgb == c1) 
			{
			discard;
			}
		}
	


gl_FragColor = rgb;

}
