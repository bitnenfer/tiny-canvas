function B(a,b,d){d=a.createShader(d);a.shaderSource(d,b);a.compileShader(d);return d}function C(a,b,d){var m=a.createProgram();b=B(a,b,35633);d=B(a,d,35632);a.attachShader(m,b);a.attachShader(m,d);a.linkProgram(m);return m}function D(a,b,d,m){var e=a.createBuffer();a.bindBuffer(b,e);a.bufferData(b,d,m);return e}window.TCShd=B;window.TCPrg=C;window.TCBuf=D;
window.TCTex=function(a,b,d,m){var e=a.createTexture();a.bindTexture(3553,e);a.texParameteri(3553,10242,33071);a.texParameteri(3553,10243,33071);a.texParameteri(3553,10240,9728);a.texParameteri(3553,10241,9728);a.texImage2D(3553,0,6408,6408,5121,b);a.bindTexture(3553,null);e.width=d;e.height=m;return e};
window.TC=function(a){var b=a.getContext("webgl"),d=a.width,m=a.height,e=C(b,"precision lowp float;\nattribute vec2 a, b;\nattribute vec4 c;\nvarying vec2 d;\nvarying vec4 e;\nuniform mat4 m;\nuniform vec2 r;\nvoid main(){\ngl_Position=m*vec4(a,1.0,1.0);\nd=b;\ne=c;\n}","precision lowp float;\nvarying vec2 d;\nvarying vec4 e;\nuniform sampler2D f;\nvoid main(){\ngl_FragColor=texture2D(f,d)*e;\n}"),q=new ArrayBuffer(873760),g=new Float32Array(q),r=new Uint32Array(q),l=new Uint16Array(131064),h=D(b,
34963,l.byteLength,35044),p=D(b,34962,q.byteLength,35048),n=0,c=new Float32Array([1,0,0,1,0,0]),k=new Float32Array(100),f=0,H=Math.cos,I=Math.sin,t=null,E=null;b.blendFunc(770,771);b.enable(3042);b.useProgram(e);b.bindBuffer(34963,h);for(h=indexB=0;65532>h;h+=6,indexB+=4)l[h+0]=indexB,l[h+1]=indexB+1,l[h+2]=indexB+2,l[h+3]=indexB+0,l[h+4]=indexB+3,l[h+5]=indexB+1;b.bufferSubData(34963,0,l);b.bindBuffer(34962,p);l=b.getAttribLocation(e,"a");p=b.getAttribLocation(e,"b");h=b.getAttribLocation(e,"c");
b.enableVertexAttribArray(l);b.vertexAttribPointer(l,2,5126,0,20,0);b.enableVertexAttribArray(p);b.vertexAttribPointer(p,2,5126,0,20,8);b.enableVertexAttribArray(h);b.vertexAttribPointer(h,4,5121,1,20,16);b.uniformMatrix4fv(b.getUniformLocation(e,"m"),0,new Float32Array([2/d,0,0,0,0,-2/m,0,0,0,0,1,1,-1,1,0,0]));b.activeTexture(33984);return E={g:b,c:a,col:4294967295,bkg:function(c,a,g){b.clearColor(c,a,g,1)},cls:function(){b.clear(16384)},trans:function(b,a){c[4]=c[0]*b+c[2]*a+c[4];c[5]=c[1]*b+c[3]*
a+c[5]},scale:function(b,a){c[0]*=b;c[1]*=b;c[2]*=a;c[3]*=a},rot:function(b){var a=c[0],g=c[1],d=c[2],f=c[3],e=I(b);b=H(b);c[0]=a*b+d*e;c[1]=g*b+f*e;c[2]=a*-e+d*b;c[3]=g*-e+f*b},push:function(){k[f+0]=c[0];k[f+1]=c[1];k[f+2]=c[2];k[f+3]=c[3];k[f+4]=c[4];k[f+5]=c[5];f+=6},pop:function(){f-=6;c[0]=k[f+0];c[1]=k[f+1];c[2]=k[f+2];c[3]=k[f+3];c[4]=k[f+4];c[5]=k[f+5]},img:function(a,d,e,f,h,k,l,m,p){var F=d+f,G=e+h;h=e+h;f=d+f;var u=c[0],v=c[1],w=c[2],x=c[3],y=c[4],z=c[5],A=E.col;if(a!=t||10922<=n+1)b.bufferSubData(34962,
0,q),b.drawElements(4,6*n,5123,0),n=0,t!=a&&(t=a,b.bindTexture(3553,t));a=20*n;g[a++]=d*u+e*w+y;g[a++]=d*v+e*x+z;g[a++]=k;g[a++]=l;r[a++]=A;g[a++]=F*u+G*w+y;g[a++]=F*v+G*x+z;g[a++]=m;g[a++]=p;r[a++]=A;g[a++]=d*u+h*w+y;g[a++]=d*v+h*x+z;g[a++]=k;g[a++]=p;r[a++]=A;g[a++]=f*u+e*w+y;g[a++]=f*v+e*x+z;g[a++]=m;g[a++]=l;r[a++]=A;10922<=++n&&(b.bufferSubData(34962,0,q),b.drawElements(4,6*n,5123,0),n=0)},flush:function(){0!=n&&(b.bufferSubData(34962,0,g.subarray(0,20*n)),b.drawElements(4,6*n,5123,0),n=0)}}};
