#version 330 compatibility



out  vec3 eyeDir;

out vec3 vNs;

out vec3 vMCposition;

out vec3 vEC;

out vec2 vST;



uniform float uBlend;



const float PI = 3.14159;



void main( )

{

	

	  

	vec4 vertex0 = gl_Vertex;

	vST = gl_MultiTexCoord0.st;

	vertex0.xyz *= 4./length(vertex0.xyz);

    vec3 tnorm      = normalize( vec3( gl_NormalMatrix * gl_Normal ) );

	vEC = vec3( gl_ModelViewMatrix * vertex0 );

    //vLightIntensity  = abs( dot( normalize(LIGHTPOS - vEC), tnorm ) );

	//if( vLightIntensity < 0.2 )

	//	vLightIntensity = 0.2;

		

	//vColor = gl_Color;



	float t;

	

	t = uBlend;

	eyeDir = vEC.xyz - vec3(0., 0., 0.);	

	vNs=tnorm;

	vMCposition =vertex0.xyz;



	gl_Position = gl_ModelViewProjectionMatrix * mix( gl_Vertex, vertex0,t);

}

