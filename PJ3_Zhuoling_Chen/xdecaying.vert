#version 330 compatibility

uniform float uA;
uniform float uB;
uniform float uC;
uniform float uD;
uniform float uE;


float PI=3.1415926;


out vec3 vECposition;
out vec3  vMCposition;

uniform float uLightX, uLightY, uLightZ;
flat out vec3 vNf;
out vec3 vNs;
flat out vec3 vLf;
out vec3 vLs;
flat out vec3 vEf;
out vec3 vEs;

float x=gl_Vertex.x;
float y=gl_Vertex.y;
float Z1;
float  Z2;
float r;
vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );


void 

main()

{

vec4 aVertex = gl_Vertex;



r= x*x+y*y;

Z1 = uA*(cos(2*PI*uB*x+uC) * exp(-uD*x))* exp(-uE*y);

Z2 =uA*cos(2*PI*uB*r+uC)* exp(-uD*r);

aVertex.z=Z1+Z2;


float drdx = (x/r); 
float drdy = (y/r);


float dzdx = uA * ( -sin(2.*PI*uB*x+uC) * 2.*PI*uB * exp(-uD*x) + cos(2.*PI*uB*x+uC) * -uD * exp(-uD*x) ) * ( exp(-uE*y) );

float dzdy = uA * ( cos(2.*PI*uB*x+uC) * exp(-uD*x) ) * ( -uE * exp(-uE*y) );




vec3 Tx = vec3(1., 0., drdx+dzdx);
vec3 Ty = vec3(0., 1., drdy+dzdy);

vec3 nNormal = normalize(cross(Tx, Ty));

vec4 ECposition = gl_ModelViewMatrix * aVertex;
 
vNf = normalize( gl_NormalMatrix * nNormal ); // surface normal vector
vNs = vNf;

vLf = eyeLightPosition - ECposition.xyz; // vector from the point
vLs = vLf; // to the light position

vEf = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point
vEs = vEf ; // to the eye position

gl_Position = gl_ModelViewProjectionMatrix * aVertex;


}
