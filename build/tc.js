function E(a,b,f){f=a.createShader(f);a.shaderSource(f,b);a.compileShader(f);return f}function F(a,b,f){var g=a.createProgram();b=E(a,b,35633);f=E(a,f,35632);a.attachShader(g,b);a.attachShader(g,f);a.linkProgram(g);g.use=function(){a.useProgram(g)};g.a=function(b){return a.getAttribLocation(g,b)};g.h=function(){return a.getUniformLocation(g,"m")};return g}
function G(a,b,f,g){var d=a.createBuffer();a.bindBuffer(b,d);a.bufferData(b,f,g);d.bind=function(){a.bindBuffer(b,d)};d.b=function(b,e,d,g,f){a.enableVertexAttribArray(b);a.vertexAttribPointer(b,e,d,g,20,f)};d.upload=function(d){a.bufferSubData(b,0,d)};return d}
window.TcCnv=function(a){var b=a.getContext("webgl"),f=a.width,g=a.height,d=F(b,"precision lowp float;\nattribute vec2 a;\nattribute vec2 b;\nattribute vec4 c;\nvarying vec2 d;\nvarying vec4 e;\nuniform mat4 m;\nuniform vec2 r;\nvoid main(){\ngl_Position=m*vec4(a,1.0,1.0);\nd=b;\ne=c;\n}","precision lowp float;\nvarying vec2 d;\nvarying vec4 e;\nuniform sampler2D f;\nvoid main(){\ngl_FragColor=texture2D(f,d)*e;\n}"),v=new ArrayBuffer(8E5),e=new Float32Array(v),w=new Uint32Array(v),m=new Uint16Array(12E4),
t=G(b,34963,m.byteLength,35044),q=G(b,34962,v.byteLength,35048),p=0,u=4294967295,c=new Float32Array([1,0,0,1,0,0]),l=new Float32Array(100),h=0,H=Math.cos,I=Math.sin,x=null,r=null;b.blendFunc(770,771);b.enable(3042);d.use();t.bind();for(var n=indexB=0;6E4>n;n+=6,indexB+=4)m[n+0]=indexB,m[n+1]=indexB+1,m[n+2]=indexB+2,m[n+3]=indexB+0,m[n+4]=indexB+3,m[n+5]=indexB+1;t.upload(m);q.bind();q.b(d.a("a"),2,5126,0,0);q.b(d.a("b"),2,5126,0,8);q.b(d.a("c"),4,5121,1,16);b.uniformMatrix4fv(d.h(),0,new Float32Array([2/
f,0,0,0,0,-2/g,0,0,0,0,1,1,-1,1,0,0]));b.activeTexture(b.TEXTURE0);return r={g:b,c:a,cls:function(c,a,e){b.clearColor(c,a,e,1);b.clear(16384)},trans:function(a,b){c[4]=c[0]*a+c[2]*b+c[4];c[5]=c[1]*a+c[3]*b+c[5]},scale:function(a,b){c[0]*=a;c[1]*=a;c[2]*=b;c[3]*=b},rot:function(a){var b=c[0],e=c[1],d=c[2],g=c[3],f=I(a);a=H(a);c[0]=b*a+d*f;c[1]=e*a+g*f;c[2]=b*-f+d*a;c[3]=e*-f+g*a},push:function(){l[h+0]=c[0];l[h+1]=c[1];l[h+2]=c[2];l[h+3]=c[3];l[h+4]=c[4];l[h+5]=c[5];h+=6},pop:function(){h-=6;c[0]=
l[h+0];c[1]=l[h+1];c[2]=l[h+2];c[3]=l[h+3];c[4]=l[h+4];c[5]=l[h+5]},col:function(a){u=a},img:function(a,b,c){r.f(a,b,c,0,0,1,1)},imgRect:function(a,b,c,e,d,f,g){var h=a.width,l=a.height;e/=h;d/=l;r.f(a,b,c,h,l,e,d,e+f/h,d+g/l)},imgUV:function(a,d,f,g,h,l,m,n,q){var r=d+g,t=f+h;h=f+h;g=d+g;var y=c[0],z=c[1],A=c[2],B=c[3],C=c[4],D=c[5],k=20*p;if(a!=x||1E4<p)b.bufferSubData(34962,0,v),b.drawElements(4,6*p,5123,0),p=0,x!=a?(x=a,b.bindTexture(b.TEXTURE_2D,x)):0;e[k+0]=d*y+f*A+C;e[k+1]=d*z+f*B+D;e[k+2]=
l;e[k+3]=m;w[k+4]=u;e[k+5]=r*y+t*A+C;e[k+6]=r*z+t*B+D;e[k+7]=n;e[k+8]=q;w[k+9]=u;e[k+10]=d*y+h*A+C;e[k+11]=d*z+h*B+D;e[k+12]=l;e[k+13]=q;w[k+14]=u;e[k+15]=g*y+f*A+C;e[k+16]=g*z+f*B+D;e[k+17]=n;e[k+18]=m;w[k+19]=u;++p},flush:function(){0!=p&&(b.bufferSubData(34962,0,e.subarray(0,20*p)),b.drawElements(4,6*p,5123,0),p=0)}}};window.TcShd=E;window.TcPrg=F;window.TcBuf=G;
window.TcTex=function(a,b,f,g){var d=a.createTexture();a.bindTexture(3553,d);a.texParameteri(3553,10242,33071);a.texParameteri(3553,10243,33071);a.texParameteri(3553,10240,9728);a.texParameteri(3553,10241,9728);a.texImage2D(3553,0,6408,6408,5121,b);a.bindTexture(3553,null);d.bind=function(b,e){e=e||0;a.uniform1i(b||0,e);a.activeTexture(a.TEXTURE0+e);a.bindTexture(a.TEXTURE_2D,d)};d.width=f;d.height=g;return d};
