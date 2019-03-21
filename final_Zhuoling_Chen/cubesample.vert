#version 330 compatibility
const float PI = 3.14159265;
const float TWOPI = 2.*PI;
float x=gl_Vertex.x;
float y=gl_Vertex.y;
float z=gl_Vertex.z;
//float Z1;
uniform float uA, uB, uC, uD, uE;
out vec3 vNs;
out vec3 vMC;
out vec3 vEC;
uniform float uEta;
void
main( )
{
	vMC = gl_Vertex.xyz;
	vec4 newVertex = gl_Vertex;
    //Z1 = uA*(cos(2*PI*uB*x+uC) * exp(-uD*x))* exp(-uE*y);

	//newVertex.z=Z1;
	vec4 ECposition = gl_ModelViewMatrix * newVertex;
	vEC = ECposition.xyz;

	float dzdx = uA * ( -sin(TWOPI*uB*x+uC)* TWOPI * uB * exp(-uD*x)  +  cos(TWOPI*uB*x+uC) * -uD * exp(-uD*x) ) * ( exp(-uE*y) );
	vec3 xtangent = vec3( 1., 0., dzdx );
	float dzdy =  uA * cos(TWOPI*uB*x+uC) * exp(-uD*x) * -uE * exp( -uE*y );
	vec3 ytangent = vec3( 0., 1., dzdy );
	
	//vMC= vec3( x,y,z);

	//vec3 eyeDir = normalize( vEC );	
	
	vec3 newNormal = normalize(  gl_NormalMatrix * cross( xtangent, ytangent )  );
	vNs = newNormal;
	
	

	gl_Position = gl_ModelViewProjectionMatrix * newVertex;
}
