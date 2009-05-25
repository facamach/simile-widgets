﻿

/* compile-prolog.js */
window.Exhibit_EditingExtension_isCompiled=true;


/* editing-extension.js */
(function(){var G=("Exhibit_EditingExtension_isCompiled" in window)&&window.Exhibit_EditingExtension_isCompiled;
Exhibit.EditingExtension={params:{bundle:false}};
var H=["extra.js","ui/lens.js","ui/editing-lens.js","ui/editing-formatter.js","data/editing-backend.js"];
var B=["editing.css"];
var F={bundle:Boolean};
if(typeof Exhibit_EditingExtension_urlPrefix=="string"){Exhibit.EditingExtension.urlPrefix=Exhibit_EditingExtension_urlPrefix;
if("Exhibit_EditingExtension_parameters" in window){SimileAjax.parseURLParameters(Exhibit_EditingExtension_parameters,Exhibit.EditingExtension.params,F);
}}else{var D=SimileAjax.findScript(document,"/editing-extension.js");
if(D==null){SimileAjax.Debug.exception(new Error("Failed to derive URL prefix for Simile Exhibit Editing Extension code files"));
return ;
}Exhibit.EditingExtension.urlPrefix=D.substr(0,D.indexOf("editing-extension.js"));
SimileAjax.parseURLParameters(D,Exhibit.EditingExtension.params,F);
}var A=[];
var C=[];
if(Exhibit.EditingExtension.params.bundle){A.push(Exhibit.EditingExtension.urlPrefix+"editing-extension-bundle.js");
C.push(Exhibit.EditingExtension.urlPrefix+"editing-extension-bundle.css");
}else{SimileAjax.prefixURLs(A,Exhibit.EditingExtension.urlPrefix+"scripts/",H);
SimileAjax.prefixURLs(C,Exhibit.EditingExtension.urlPrefix+"styles/",B);
}for(var E=0;
E<Exhibit.locales.length;
E++){A.push(Exhibit.EditingExtension.urlPrefix+"locales/"+Exhibit.locales[E]+"/editing-locale.js");
}if(!G){SimileAjax.includeJavascriptFiles(document,"",A);
SimileAjax.includeCssFiles(document,"",C);
}})();


/* editing-extension-bundle.js */
Exhibit.EditingBackend=function(){this._nodeTree={};
this._dataTree={};
};
Exhibit.EditingBackend.prototype.rebuildNodeTree=function(F,G){if(root==undefined||root==null){root=document.body;
}var H=[];
var E=function(C,D,A){var J;
if((J=Exhibit.getAttribute(D,"ex:property"))!=null){H.properties[J]=[];
walkItem(node,J);
}else{if(D.className=="editable-exhibit-value"||D.className=="modified-exhibit_value"){H.properties[A].push(node);
}else{for(var B=0;
B<node.childNodes.length;
B++){E(node.childNodes[B],A);
}}}};
return this._nodeTree=E(F,G,null);
};
Exhibit.EditingBackend.prototype.rebuildDataTree=function(P){this._mode=(P==undefined||P==null)?"full":"diff";
var N=[];
for(var M in this._nodeTree){if(this._mode="full"){var R=P.getAllProperties();
var L=Exhibit.ViewPanel.getPropertyValuesPairs(M,R,P);
N[M]={};
for(var T=0;
T<L.length;
T++){var K=L[T];
N[M][K.propertyID]=[];
for(var S=0;
S<K.values.length;
S++){N[M][K.propertyID].push(K.values[S]);
}}}for(var O in this._nodeTree[S].properties){N[M][O]=[];
valueNodes=this._nodeTree[M].properties[O];
for(var Q=0;
Q<values.length;
Q++){N[M][O].push(Exhibit.EditingBackend.getNodeValue(valueNodes));
}}}return this._dataTree=N;
};
Exhibit.EditingBackend.getNodeValue=function(B){if(B.tag.toLowerCase()=="input"){return B.value;
}else{return B.innerHTML;
}};
Exhibit.UI.makeEditValueSpan=function(M,I,L,J){var K=document.createElement("span");
K.className="exhibit-value";
var N=document.createElement("input");
N.className="editable-exhibit-value";
var N=document.createElement("input");
N.className="editable-exhibit-value";
N.value=M;
K.appendChild(N);
if(J){var H=Exhibit.UI.createTranslucentImage("images/remove-icon.png");
H.width=10;
H.height=10;
H.style.margin=0;
H.title="remove value";
SimileAjax.WindowManager.registerEvent(H,"click",function(B,C,A){K.parentNode.removeChild(K);
});
K.appendChild(H);
}return K;
};
Exhibit.UI.makeEditItemSpan=function(H,K,L,J){if(K==null){K=database.getObject(H,"label");
if(K==null){K=H;
}}var G=SimileAjax.DOM.createElementFromString('<a href="'+Exhibit.Persistence.getItemLink(H)+"\" class='exhibit-item'>"+K+"</a>");
var I=function(B,C,A){Exhibit.UI.showEditItemInPopup(H,B,L);
};
SimileAjax.WindowManager.registerEvent(G,"click",I,J);
return G;
};
Exhibit.UI.correctPopupBehavior=function(H,G,F,E){F.firstChild.style.display="none";
F.lastChild.onclick="";
SimileAjax.WindowManager.registerEvent(F.lastChild,"click",function(B,C,A){H._saveFromEditingLens(G,F,E);
});
};
Exhibit.UI.showEditItemInPopup=function(I,L,M){var J=SimileAjax.DOM.getPageCoordinates(L);
var N=SimileAjax.Graphics.createBubbleForPoint(J.left+Math.round(L.offsetWidth/2),J.top+Math.round(L.offsetHeight/2),M.getSetting("bubbleWidth"),M.getSetting("bubbleHeight"));
var H=document.createElement("div");
var K=M.getLensRegistry().createLens(I,H,M,true);
K._convertLens(I,H,M,true);
Exhibit.UI.correctPopupBehavior(K,I,H,M);
N.content.appendChild(H);
};
Exhibit.Database._Impl.prototype.getItem=function(B){if(this._items.contains(B)){this._items[B];
}return null;
};
Exhibit.Database._Impl.prototype.reloadItem=function(G,H){try{for(p in H){this.removeObjects(G,p);
}var F={};
F.items=[H];
database.loadData(F);
}catch(E){alert(E);
}};
Exhibit.createPopupMenu=function(E,F){var G=document.createElement("div");
G.className="exhibit-menu-popup exhibit-ui-protection";
var H={elmt:G,close:function(){try{document.body.removeChild(this.elmt);
}catch(A){}},open:function(){var C=this;
this.layer=SimileAjax.WindowManager.pushLayer(function(){C.close();
},true,this.elmt);
document.body.appendChild(G);
var B=document.body.offsetWidth;
var D=document.body.offsetHeight;
var A=SimileAjax.DOM.getPageCoordinates(E);
if(F=="center"){G.style.top=(A.top+E.scrollHeight)+"px";
G.style.left=(A.left+Math.ceil(E.offsetWidth-G.offsetWidth)/2)+"px";
}else{if(F=="right"){G.style.top=A.top+"px";
G.style.left=(A.left+G.offsetWidth)+"px";
}else{G.style.top=(A.top+E.scrollHeight)+"px";
G.style.left=A.left+"px";
}}},makeMenuItem:function(D,C,B){var K=this;
var L=document.createElement("a");
L.className="exhibit-menu-item";
L.href="javascript:";
L.onmouseover=function(){K._mouseoverMenuItem(L);
};
if(B!=null){SimileAjax.WindowManager.registerEvent(L,"click",function(I,J,N){B(I,J,N);
SimileAjax.WindowManager.popLayer(K.layer);
SimileAjax.DOM.cancelEvent(J);
return false;
});
}var A=document.createElement("div");
L.appendChild(A);
A.appendChild(SimileAjax.Graphics.createTranslucentImage(C!=null?C:(Exhibit.urlPrefix+"images/blank-16x16.png")));
A.appendChild(document.createTextNode(D));
return L;
},appendMenuItem:function(C,B,A){this.elmt.appendChild(this.makeMenuItem(C,B,A));
},makeSectionHeading:function(B){var A=document.createElement("div");
A.className="exhibit-menu-section";
A.innerHTML=B;
return A;
},appendSectionHeading:function(B,A){this.elmt.appendChild(this.makeSectionHeading(B,A));
},makeSubMenu:function(N,P){var A=this;
var D=document.createElement("a");
D.className="exhibit-menu-item potluck-submenu";
D.href="javascript:";
var C=Exhibit.createPopupMenu(D,"right");
D.onmousemove=function(){A._mousemoveSubmenu(D,C);
};
var R=document.createElement("div");
D.appendChild(R);
var B=document.createElement("table");
B.cellSpacing=0;
B.cellPadding=0;
B.width="100%";
R.appendChild(B);
var O=B.insertRow(0);
var Q=O.insertCell(0);
Q.appendChild(document.createTextNode(N));
Q=O.insertCell(1);
Q.align="right";
Q.style.verticalAlign="middle";
Q.appendChild(Exhibit.UI.createTranslucentImage("images/submenu.png"));
P.appendChild(D);
return C;
},appendSubMenu:function(A){return this.makeSubMenu(A,G);
},appendSeparator:function(){var A=document.createElement("hr");
this.elmt.appendChild(A);
},_mousemoveSubmenu:function(A,B){if(this._submenu!=null){if(this._submenu!=A){if(this._timer!=null){window.clearTimeout(this._timer);
this._timer=null;
}var C=this;
this._timer=window.setTimeout(function(){C._timer=null;
C._closeSubmenu();
C._openSubmenu(A,B);
},200);
}}else{this._openSubmenu(A,B);
}},_mouseoverMenuItem:function(A){var B=this;
if(this._submenu!=null&&this._timer==null){this._timer=window.setTimeout(function(){B._timer=null;
B._closeSubmenu();
},200);
}},_openSubmenu:function(A,B){this._submenu=A;
this._submenuDom=B;
B.open();
},_closeSubmenu:function(){if(this._submenuDom!=null){this._submenuDom.close();
}this._submenu=null;
this._submenuDom=null;
},_submenu:null,_submenuDom:null,_timer:null};
return H;
};
Exhibit.UI.removeChildren=function(D){for(var C=D.childNodes.length;
C>0;
C--){D.removeChild(D.lastChild);
}};
Exhibit.UI.findClassMembers=function(G,F){var H=[];
var E=function(A){if(A.className==G){H.push(A);
}else{for(var B=0;
B<A.childNodes.length;
B++){E(A.childNodes[B]);
}}};
E(F);
return H;
};
Exhibit.ViewPanel.getPropertyValuesPairs=function(J,I,K){var L=[];
var N=function(G,C){var A=K.getProperty(G);
var D=C?K.getObjects(J,G):K.getSubjects(J,G);
var B=D.size();
if(B>0){var E=A.getValueType()=="item";
var F={propertyID:G,propertyLabel:C?(B>1?A.getPluralLabel():A.getLabel()):(B>1?A.getReversePluralLabel():A.getReverseLabel()),valueType:A.getValueType(),values:[]};
if(E){D.visit(function(Q){var R=K.getObject(Q,"label");
F.values.push(R!=null?R:Q);
});
}else{D.visit(function(P){F.values.push(P);
});
}L.push(F);
}};
for(var H=0;
H<I.length;
H++){var M=I[H];
if(typeof M=="string"){N(M,true);
}else{N(M.property,M.forward);
}}return L;
};
Exhibit.TileView.createFromDOM=function(H,I,J){var G=Exhibit.getConfigurationFromDOM(H);
var F=new Exhibit.TileView(I!=null?I:H,Exhibit.UIContext.createFromDOM(H,J));
F._orderedViewFrame.configureFromDOM(H);
F._orderedViewFrame.configure(G);
F._editSetting=Exhibit.getAttribute(H,"editing");
if(F._editSetting==null){F._editSetting=false;
}F._initializeUI();
return F;
};
Exhibit.TileView.prototype._reconstruct=function(){var D=this;
var F={div:this._dom.bodyDiv,contents:null,groupDoms:[],groupCounts:[]};
var E=function(B){for(var A=B;
A<F.groupDoms.length;
A++){F.groupDoms[A].countSpan.innerHTML=F.groupCounts[A];
}F.groupDoms=F.groupDoms.slice(0,B);
F.groupCounts=F.groupCounts.slice(0,B);
if(B>0){F.div=F.groupDoms[B-1].contentDiv;
}else{F.div=D._dom.bodyDiv;
}F.contents=null;
};
this._orderedViewFrame.onNewGroup=function(H,A,C){E(C);
var B=Exhibit.TileView.constructGroup(C,H);
F.div.appendChild(B.elmt);
F.div=B.contentDiv;
F.groupDoms.push(B);
F.groupCounts.push(0);
};
this._orderedViewFrame.onNewItem=function(A,J){if(F.contents==null){F.contents=Exhibit.TileView.constructList();
F.div.appendChild(F.contents);
}for(var I=0;
I<F.groupCounts.length;
I++){F.groupCounts[I]++;
}var B=document.createElement("li");
var C=D._uiContext.getLensRegistry().createLens(A,B,D._uiContext,D._editSetting);
F.contents.appendChild(B);
};
this._div.style.display="none";
this._dom.bodyDiv.innerHTML="";
this._orderedViewFrame.reconstruct();
E(0);
this._div.style.display="block";
};
Exhibit.ThumbnailView.createFromDOM=function(H,I,J){var G=Exhibit.getConfigurationFromDOM(H);
var F=new Exhibit.ThumbnailView(I!=null?I:H,Exhibit.UIContext.createFromDOM(H,J,true));
F._lensRegistry=Exhibit.UIContext.createLensRegistryFromDOM(H,G,J.getLensRegistry());
F._orderedViewFrame.configureFromDOM(H);
F._orderedViewFrame.configure(G);
F._editSetting=Exhibit.getAttribute(H,"editing");
if(F._editSetting==null){F._editSetting=false;
}F._initializeUI();
return F;
};
Exhibit.ThumbnailView.prototype._reconstruct=function(){var D=this;
var F={div:this._dom.bodyDiv,itemContainer:null,groupDoms:[],groupCounts:[]};
var E=function(B){for(var A=B;
A<F.groupDoms.length;
A++){F.groupDoms[A].countSpan.innerHTML=F.groupCounts[A];
}F.groupDoms=F.groupDoms.slice(0,B);
F.groupCounts=F.groupCounts.slice(0,B);
if(B>0){F.div=F.groupDoms[B-1].contentDiv;
}else{F.div=D._dom.bodyDiv;
}F.itemContainer=null;
};
this._orderedViewFrame.onNewGroup=function(H,A,C){E(C);
var B=Exhibit.ThumbnailView.constructGroup(C,H);
F.div.appendChild(B.elmt);
F.div=B.contentDiv;
F.groupDoms.push(B);
F.groupCounts.push(0);
};
this._orderedViewFrame.onNewItem=function(A,I){if(F.itemContainer==null){F.itemContainer=Exhibit.ThumbnailView.constructItemContainer();
F.div.appendChild(F.itemContainer);
}for(var C=0;
C<F.groupCounts.length;
C++){F.groupCounts[C]++;
}var J=document.createElement("div");
J.className=SimileAjax.Platform.browser.isIE?"exhibit-thumbnailView-itemContainer-IE":"exhibit-thumbnailView-itemContainer";
var B=D._lensRegistry.createLens(A,J,D._uiContext,D._editSetting);
F.itemContainer.appendChild(J);
};
this._div.style.display="none";
this._dom.bodyDiv.innerHTML="";
this._orderedViewFrame.reconstruct();
E(0);
this._div.style.display="block";
};
Exhibit.Formatter._ListFormatter.prototype.formatList=function(M,K,J,P,I){var N=this._uiContext;
var O=this;
if(K==0){if(this._emptyText!=null&&this._emptyText.length>0){P(document.createTextNode(this._emptyText));
}}else{if(K==1){M.visit(function(A){N.format(A,J,P,I);
});
}else{var L=0;
if(K==2){M.visit(function(A){N.format(A,J,P,I);
L++;
if(L==1){P(document.createTextNode(O._pairSeparator));
}});
}else{M.visit(function(A){N.format(A,J,P,I);
L++;
if(L<K){P(document.createTextNode((L==K-1)?O._lastSeparator:O._separator));
}});
}}}};
Exhibit.Formatter._TextFormatter.prototype.format=function(G,J,F){var I=this;
var H=document.createElement("span");
H.innerHTML=this.formatText(G);
if(F&&!F){H.setAttribute("ex:value",G);
H.className="editable-exhibit-value";
SimileAjax.WindowManager.registerEvent(H,"click",function(){var A=document.createElement("span");
A.setAttribute("ex:value",G);
var B=document.createElement("input");
B.style.width=H.style.width;
B.value=G;
A.className="editing-parent";
A.appendChild(B);
SimileAjax.WindowManager.registerEvent(B,"blur",function(){var D=A.parentNode;
var C=B.value;
I.format(C,function(E){E.setAttribute("ex:value",G);
E.className=C==G?"editable-exhibit-value":"modified-exhibit-value";
J(E);
},F);
D.removeChild(A);
});
H.parentNode.replaceChild(A,H);
});
}J(H);
};
Exhibit.Formatter._BooleanFormatter.prototype.format=function(F,H,E){var G=document.createElement("span");
G.innerHTML=this.formatText(F);
H(G);
};
Exhibit.Formatter._BooleanFormatter.prototype.formatText=function(B){return(typeof B=="boolean"?B:(typeof B=="string"?(B=="true"):false))?"true":"false";
};
Exhibit.Formatter._NumberFormatter.prototype.format=function(E,F,D){F(document.createTextNode(this.formatText(E)));
};
Exhibit.Formatter._NumberFormatter.prototype.formatText=function(B){if(this._decimalDigits==-1){return B.toString();
}else{return new Number(B).toFixed(this._decimalDigits);
}};
Exhibit.Formatter._ImageFormatter.prototype.format=function(F,H,E){var G=document.createElement("img");
G.src=F;
if(this._tooltip!=null){if(typeof this._tooltip=="string"){G.title=this._tootlip;
}else{G.title=this._tooltip.evaluateSingleOnItem(this._uiContext.getSetting("itemID"),this._uiContext.getDatabase()).value;
}}H(G);
};
Exhibit.Formatter._ImageFormatter.prototype.formatText=function(B){return B;
};
Exhibit.Formatter._URLFormatter.prototype.format=function(F,G,H){var E=document.createElement("a");
E.href=F;
E.innerHTML=F;
if(this._target!=null){E.target=this._target;
}if(this._externalIcon!=null){}G(E);
};
Exhibit.Formatter._URLFormatter.prototype.formatText=function(B){return B;
};
Exhibit.Formatter._CurrencyFormatter.prototype.format=function(H,J,F){var G=this.formatText(H);
if(H<0&&this._negativeFormat.red){var I=document.createElement("span");
I.innerHTML=G;
I.style.color="red";
J(I);
}else{J(document.createTextNode(G));
}};
Exhibit.Formatter._CurrencyFormatter.prototype.formatText=function(G){var H=G<0;
var F;
if(this._decimalDigits==-1){F=Math.abs(G);
}else{F=new Number(Math.abs(G)).toFixed(this._decimalDigits);
}var E=(H&&this._negativeFormat.signed)?"-":"";
if(H&&this._negativeFormat.parentheses){F="("+F+")";
}switch(this._negativeFormat){case"first":F=this._symbol+E+F;
break;
case"after-sign":F=E+this._symbol+F;
break;
case"last":F=E+F+this._symbol;
break;
}return F;
};
Exhibit.Formatter._ItemFormatter.prototype.format=function(J,M,N){var L=this;
var I=this.formatText(J);
var H=SimileAjax.DOM.createElementFromString('<a href="'+Exhibit.Persistence.getItemLink(J)+"\" class='exhibit-item'>"+I+"</a>");
var K=function(B,C,A){Exhibit.UI.showItemInPopup(J,B,L._uiContext);
};
SimileAjax.WindowManager.registerEvent(H,"click",K,this._uiContext.getSetting("layer"));
M(H);
};
Exhibit.Formatter._ItemFormatter.prototype.formatText=function(F){var D=this._uiContext.getDatabase();
var E=null;
if(this._title==null){E=D.getObject(F,"label");
}else{E=this._title.evaluateSingleOnItem(F,D).value;
}if(E==null){E=F;
}return E;
};
Exhibit.Formatter._DateFormatter.prototype.format=function(E,F,D){F(document.createTextNode(this.formatText(E)));
};
Exhibit.Formatter._DateFormatter.prototype.formatText=function(I){var L=(I instanceof Date)?I:SimileAjax.DateTime.parseIso8601DateTime(I);
if(L==null){return I;
}L.setTime(L.getTime()+this._timeZoneOffset);
var H="";
var G=this._segments;
for(var K=0;
K<G.length;
K++){var J=G[K];
if(typeof J=="string"){H+=J;
}else{H+=J(L);
}}return H;
};
Exhibit.EditingLens={};
var NO_EDITING=0;
var SIMPLE_EDITING=1;
var ADVANCED_EDITING=2;
Exhibit.EditingLens=function(I,H,L,K){var G=this;
this._rootNode=H;
var J=L.getDatabase();
this.backend=new Exhibit.EditingBackend();
this._getItemData=function(){var F={};
var C=J.getAllProperties();
var B=Exhibit.ViewPanel.getPropertyValuesPairs(I,C,J);
for(var E=0;
E<B.length;
E++){var A=B[E];
F[A.propertyID]=[];
for(var D=0;
D<A.values.length;
D++){F[A.propertyID].push(A.values[D]);
}}return F;
};
this._restore=function(){Exhibit.UI.removeChildren(G._rootNode);
H.style.marginBottom="0em";
H.style.marginTop="0em";
H.style.border="none";
K(G);
};
this._revert=function(){G._itemData=this._getItemData();
};
this._revert();
};
Exhibit.EditingLens._getAreEditing=function(B){if(!B.areEditing){B.areEditing={};
}return B.areEditing;
};
Exhibit.EditingLens.setEditing=function(F,G,E){var H=Exhibit.EditingLens._getAreEditing(E);
switch(G){case SIMPLE_EDITING:case ADVANCED_EDITING:H[F]=G;
break;
default:H[F]=NO_EDITING;
}};
Exhibit.EditingLens.getEditing=function(E,D){var F=Exhibit.EditingLens._getAreEditing(D);
return F[E];
};
Exhibit.EditingLens.create=function(I,H,L,K,J,G){if(G==undefined||G==null){Exhibit.EditingLens.setEditing(I,NO_EDITING,L);
}else{Exhibit.EditingLens.setEditing(I,G,L);
}return new Exhibit.EditingLens(I,H,L,J);
};
Exhibit.EditingLens.prototype._constructDefaultUI=function(R,T,c){var U=this;
var W=c.getDatabase();
if(this._commonProperties==null){this._commonProperties=W.getAllProperties();
}var b=this._commonProperties;
var Z=W.getObject(R,"label");
var V={elmt:T,className:"exhibit-lens",children:[{tag:"div",className:"exhibit-lens-title",field:"titlebar",title:Z,children:[Z]},{tag:"div",className:"exhibit-lens-body",children:[{tag:"table",className:"exhibit-lens-properties",field:"propertiesTable"}]},{tag:"div",className:"exhibit-lens-title",title:Z,children:[Z]},]};
var d=SimileAjax.DOM.createDOMFromTemplate(V);
T.setAttribute("ex:itemID",R);
this._TBody=d.propertiesTable.tBodies[0];
var Y=W.getAllProperties();
var S=Exhibit.ViewPanel.getPropertyValuesPairs(R,Y,W);
for(var e=0;
e<S.length;
e++){var f=S[e];
var a=d.propertiesTable.insertRow(e);
a.className="exhibit-lens-property";
a.setAttribute("ex:propertyID",f.propertyID);
var Q=a.insertCell(0);
Q.className="exhibit-lens-property-name";
Q.innerHTML=f.propertyLabel;
var X=a.insertCell(1);
X.className="exhibit-lens-property-values";
this._fillCell(f.propertyID,X,c);
}T.style.marginBottom="2em";
T.style.marginTop="0.5em";
T.style.border="solid";
T.style.borderWidth="1";
this._makeEditing(R,T,c,Exhibit.EditingLens.getEditing(R,c));
};
Exhibit.EditingLens.prototype._makeEditing=function(h,S,g,U){var V=this;
var R=document.createElement("span");
R.className="exhibit-toolboxWidget-popup screen";
var Z=Exhibit.UI.createTranslucentImage("images/edit-icon.png");
Z.className="exhibit-toolboxWidget-button";
SimileAjax.WindowManager.registerEvent(Z,"click",function(B,C,A){V._convertLens(h,S,g,U==0?1:0);
});
R.style.marginTop=U==0?1:0;
R.style.marginRight=U==0?1:0;
R.appendChild(Z);
var Y=document.createElement("div");
Y.style.textAlign="right";
if(U==ADVANCED_EDITING){Y.style.borderBottom="solid";
Y.style.borderWidth=1;
}else{Y.style.border="none";
}var c=document.createElement("span");
c.className="item-edit-button";
c.innerHTML=U==0?"Edit":"Done";
c.title=U==0?"Open editing view.":"Save and return to normal view.";
SimileAjax.WindowManager.registerEvent(c,"click",function(B,C,A){V._convertLens(h,S,g,U==0?1:0);
});
var T=document.createElement("span");
T.className="item-edit-button";
T.innerHTML=U==1?"Advanced":"Simple";
T.title=U==1?"Show advanced view.":"Show simple view.";
SimileAjax.WindowManager.registerEvent(T,"click",function(B,C,A){V._convertLens(h,S,g,U==1?2:1);
});
if(U==ADVANCED_EDITING){var X=document.createElement("span");
X.className="item-edit-button";
X.innerHTML="Add value";
X.title="Add a value to a property.";
SimileAjax.WindowManager.registerEvent(X,"click",function(){V._openAddTagMenu(X,h,g);
});
var d=document.createElement("span");
d.className="item-edit-button";
d.innerHTML="Remove value";
d.title="Remove a value from a property.";
SimileAjax.WindowManager.registerEvent(d,"click",function(){V._openRemoveTagMenu(d,h,g);
});
var a=document.createElement("span");
a.className="item-edit-button";
a.innerHTML="Revert";
a.title="Return to the previous saved state.";
a.onclick=function(){V._revert();
Exhibit.UI.removeChildren(V._rootNode);
V._constructEditingLens(h,V._rootNode,g);
};
var e=document.createElement("span");
e.className="item-edit-button";
e.innerHTML="Save";
e.title="Save the item.";
e.onclick=function(){V._saveFromEditingLens(h,V._rootNode,g);
};
Y.appendChild(X);
Y.appendChild(d);
Y.appendChild(a);
Y.appendChild(e);
}if(U!=NO_EDITING){Y.appendChild(T);
}Y.appendChild(c);
var b=Y;
for(var f=0;
f<S.childNodes.length;
f++){var W=S.childNodes[f];
S.replaceChild(b,W);
b=W;
}S.appendChild(b);
};
Exhibit.EditingLens.prototype._convertLens=function(G,F,H,E){if(Exhibit.EditingLens.getEditing(G,H)==E){return ;
}Exhibit.EditingLens.setEditing(G,E,H);
if(Exhibit.EditingLens.getEditing(G,H)==NO_EDITING){this._saveFromEditingLens(G,this._rootNode,H);
}Exhibit.UI.removeChildren(F);
if(E==SIMPLE_EDITING){Exhibit.Lens._constructDefaultValueList=Exhibit.EditingLens._constructDefaultValueList;
}else{Exhibit.Lens._constructDefaultValueList=Exhibit.Lens.original_constructDefaultValueList;
}if(E==ADVANCED_EDITING){this._constructDefaultUI(G,F,H);
}else{this._restore();
}};
Exhibit.EditingLens.prototype._constructEditingLens=function(F,E,D){this._constructDefaultUI(F,E,D);
};
Exhibit.EditingLens.prototype.addButtons=function(O,P,N){var Q=this;
var T=document.createElement("span");
T.className="item-edit-buttons";
var S=document.createElement("span");
S.className="item-edit-button";
S.innerHTML="Add value";
SimileAjax.WindowManager.registerEvent(S,"click",function(){Q._openAddTagMenu(S,O,N);
});
var W=document.createElement("span");
W.className="item-edit-button";
W.innerHTML="Remove value";
SimileAjax.WindowManager.registerEvent(W,"click",function(){Q._openRemoveTagMenu(W,O,N);
});
var U=document.createElement("span");
U.className="item-edit-button";
U.innerHTML="Revert";
U.onclick=function(){Q._revert();
Exhibit.UI.removeChildren(Q._rootNode);
Q._constructEditingLens(O,Q._rootNode,N);
};
var X=document.createElement("span");
X.className="item-edit-button";
X.innerHTML="Save";
X.onclick=function(){Q._saveFromEditingLens(O,Q._rootNode,N);
};
T.appendChild(S);
T.appendChild(W);
T.appendChild(X);
T.appendChild(U);
var V=T;
for(var M=0;
M<P.childNodes.length;
M++){var R=P.childNodes[M];
P.replaceChild(V,R);
V=R;
}P.appendChild(V);
P.style.padding="5px";
};
Exhibit.EditingLens.prototype._getTBody=function(){var B=function(F){var A=null;
if(F.tagName&&F.tagName.toLowerCase()=="tbody"){return F;
}else{for(var G=0;
G<F.childNodes.length;
G++){var H=B(F.childNodes[G]);
if(H!=null){A=H;
}}}return A;
};
if(this._TBody==null){this._TBody=B(this._rootNode);
}return this._TBody;
};
Exhibit.EditingLens.prototype._saveFromEditingLens=function(I,H,L){var G=this;
this.sync();
var J={};
var K=this._getItemData();
J.perform=function(){L.getDatabase().reloadItem(I,G._itemData);
};
J.undo=function(){L.getDatabase().reloadItem(I,K);
};
J.label="Changed "+K["label"][0];
SimileAjax.History.addAction(J);
};
Exhibit.EditingLens.prototype._fillCell=function(J,N,K){var L=this;
var M=this._itemData[J];
var I=K.getDatabase().getProperty(J).getValueType();
if(I=="item"){for(var H=0;
H<M.length;
H++){if(H>0){N.appendChild(document.createTextNode(", "));
}N.appendChild(Exhibit.UI.makeEditItemSpan(M[H],null,K,N.parentNode._toCheck));
}}else{for(var H=0;
H<M.length;
H++){this._addRemovableValueSpan(N,J,H,K,M.length>1);
}this._addAppendButton(J,N,K);
}};
Exhibit.EditingLens.prototype._addComaSpan=function(F,E,H,G){};
Exhibit.EditingLens.prototype._addAppendButton=function(H,G,K){var L=this;
var J=Exhibit.UI.createTranslucentImage("images/append-icon2.png");
J.width=10;
J.height=10;
J.title="add new value";
SimileAjax.WindowManager.registerEvent(J,"click",function(B,C,A){L._addValue(H,K);
});
G.appendChild(J);
if(this._itemData[H].length>1){J.className="shown";
}else{J.className="not-shown";
var I=G.parentNode;
SimileAjax.WindowManager.registerEvent(I,"mouseover",function(){numChildren=G.childNodes.length;
G.childNodes[numChildren-1].className="shown";
G.childNodes[numChildren-2].className="shown";
G.childNodes[numChildren-3].className="shown";
});
SimileAjax.WindowManager.registerEvent(I,"mouseout",function(){numChildren=G.childNodes.length;
G.childNodes[numChildren-1].className="not-shown";
G.childNodes[numChildren-2].className="not-shown";
G.childNodes[numChildren-3].className="not-shown";
});
}G.appendChild(J);
};
Exhibit.EditingLens.prototype.sync=function(K){var M=this._getTBody();
for(var N=0;
N<M.rows.length;
N++){var L=M.rows[N];
if(K==undefined||K==null||Exhibit.getAttribute(L,"ex:propertyID")==K){var P=[];
var I=Exhibit.UI.findClassMembers("editable-exhibit-value",L);
for(var O=0;
O<I.length;
O++){P.push(I[O].value);
}this._itemData[Exhibit.getAttribute(L,"ex:propertyID")]=P;
var J=Exhibit.UI.findClassMembers("exhibit-item",L);
for(var O=0;
O<J.length;
O++){P.push(J[O].innerHTML);
}this._itemData[Exhibit.getAttribute(L,"ex:propertyID")]=P;
}}};
Exhibit.EditingLens.prototype._addValue=function(J,N){var L=this._getTBody();
var K=N.getDatabase();
for(var M=0;
M<L.rows.length;
M++){var I=K.getProperty(J).getValueType();
if(Exhibit.getAttribute(this._getTBody().rows[M],"ex:propertyID")==J){var H=this._getTBody().rows[M].cells[1];
this.sync(J);
this._itemData[J].push("");
Exhibit.UI.removeChildren(H);
this._fillCell(J,H,N);
}}};
Exhibit.EditingLens.prototype._removeValue=function(L,O,P){var K=this._getTBody();
var M=P.getDatabase();
for(var N=0;
N<K.rows.length;
N++){var J=M.getProperty(L).getValueType();
if(Exhibit.getAttribute(K.rows[N],"ex:propertyID")==L){var I=K.rows[N].cells[1];
this.sync(L);
this._itemData[L].splice(O,1);
Exhibit.UI.removeChildren(I);
this._fillCell(L,I,P);
}}};
Exhibit.EditingLens.prototype._openRemoveTagMenu=function(O,Q,Y){var R=this;
this.sync();
var Z=Exhibit.createPopupMenu(O);
Z.elmt.style.width="15em";
Z.appendSectionHeading("Remove property value:");
var U=function(A){if(A.length>20){return A.substr(0,15)+"...";
}else{return A;
}};
var P=[];
var V=database.getAllProperties();
for(var X=0;
X<V.length;
X++){var S=V[X];
if(S!="uri"&&database.countDistinctObjects(Q,S)>0){var T=database.getProperty(S);
P.push({propertyID:S,label:T!=null?T.getLabel():S});
}}var W=function(A,C){if(database.getProperty(A).getValueType()=="item"){return ;
}var B=Z.appendSubMenu(C);
for(var D=0;
D<R._itemData[A].length;
D++){B.appendMenuItem(U(R._itemData[A][D]),null,(function(E){return function(){R._removeValue(A,E,Y);
};
})(D));
}};
for(var X=0;
X<P.length;
X++){var N=P[X];
W(N.propertyID,N.label);
}Z.open();
};
Exhibit.EditingLens.prototype._openAddTagMenu=function(O,Q,Y){var R=this;
this.sync();
var T=Y.getDatabase();
var Z=Exhibit.createPopupMenu(O);
Z.appendSectionHeading("Add property value to:");
var P=[];
var V=T.getAllProperties();
for(var X=0;
X<V.length;
X++){var S=V[X];
if(S!="uri"&&T.countDistinctObjects(Q,S)>0){var U=T.getProperty(S);
P.push({propertyID:S,label:U!=null?U.getLabel():S});
}}var W=function(A,B){var C=Z.makeMenuItem(B,null,function(){R._addValue(A,Y);
});
Z.elmt.appendChild(C);
};
for(var X=0;
X<P.length;
X++){var N=P[X];
W(N.propertyID,N.label);
}Z.open();
};
Exhibit.EditingLens.prototype._addRemovableValueSpan=function(L,P,K,T,S){var O=this;
var Q=this._itemData[P][K];
var R=document.createElement("input");
R.className="editable-exhibit-value";
R.value=Q;
L.appendChild(R);
var N=Exhibit.UI.createTranslucentImage("images/remove-icon.png");
N.style.cursor="pointer";
N.width=10;
N.height=10;
N.style.margin=0;
N.title="remove value";
SimileAjax.WindowManager.registerEvent(N,"click",function(A,B,C){O._removeValue(P,K,T);
});
L.appendChild(N);
var M=document.createElement("span");
M.appendChild(document.createTextNode(", "));
L.appendChild(M);
if(S){N.className="shown";
M.className="shown";
}else{N.className="not-shown";
M.className="not-shown";
}};
Exhibit.EditingLens.prototype._constructFromLensTemplateURL=function(H,F,E,G){Exhibit.Lens.lastItemID=H;
Exhibit.Lens.prototype._constructFromLensTemplateURL(H,F,E,G);
this._makeEditing(H,F,E,Exhibit.EditingLens.getEditing(H,E));
};
Exhibit.EditingLens.prototype._constructFromLensTemplateDOM=function(G,F,E,H){Exhibit.Lens.lastItemID=G;
Exhibit.Lens.prototype._constructFromLensTemplateDOM(G,F,E,H);
this._makeEditing(G,F,E,Exhibit.EditingLens.getEditing(G,E));
};
Exhibit.EditingLens._constructDefaultValueList=function(L,H,I,G,J,K){G.formatList(L,L.size(),H,function(A){I.appendChild(A);
},true);
I.className="editable-exhibit-value";
SimileAjax.WindowManager.registerEvent(I,"click",function(){if(I.className!="editing-parent"){Exhibit.UI.removeChildren(I);
I.className="editing-parent";
L.visit(function(A){Exhibit.EditingLens._addInput(L,A,H,I,G,J,K);
});
Exhibit.EditingLens._addAppendIcon(L,H,I,G,J,K);
Exhibit.EditingLens._addSaveAndCancelButtons(I,G,J,K,L,H);
}});
};
Exhibit.EditingLens._addInput=function(O,P,K,J,R,M,N){var Q=document.createElement("input");
Q.className="editable-exhibit-value";
Q.value=P;
J.appendChild(Q);
Exhibit.EditingLens._addRemoveIcon(O,K,J,R,M,N,P);
var L=document.createElement("span");
L.appendChild(document.createTextNode(", "));
J.appendChild(L);
};
Exhibit.EditingLens._addRemoveIcon=function(O,J,K,P,L,M,N){var I=Exhibit.UI.createTranslucentImage("images/remove-icon.png");
I.width=10;
I.height=10;
I.style.margin=0;
I.title="remove value";
K.onclick="";
K.onclick=null;
SimileAjax.WindowManager.registerEvent(I,"click",function(B,C,A){O.remove(N);
Exhibit.UI.removeChildren(K);
Exhibit.EditingLens._constructDefaultValueList(O,J,K,P,L,M);
});
K.appendChild(I);
};
Exhibit.EditingLens._addAppendIcon=function(N,I,J,H,K,L){var M=Exhibit.UI.createTranslucentImage("images/append-icon2.png");
M.width=10;
M.height=10;
M.title="add new value";
SimileAjax.WindowManager.registerEvent(M,"click",function(B,C,A){N.add("");
Exhibit.UI.removeChildren(J);
Exhibit.EditingLens._constructDefaultValueList(N,I,J,H,K,L);
});
J.appendChild(M);
};
Exhibit.EditingLens.makeButton=function(D,E){var F=document.createElement("span");
F.className="item-edit-button";
F.innerHTML=D;
SimileAjax.WindowManager.registerEvent(F,"click",E);
return F;
};
Exhibit.EditingLens._addSaveAndCancelButtons=function(O,U,N,Q,R,V){var S=function(){var A=Exhibit.UI.findClassMembers("editable-exhibit-value",O);
var C=[];
for(var B=0;
B<A.length;
B++){C.push(A[B].value);
}itemEntry={};
itemEntry[Q]=C;
itemEntry["id"]=N;
U.getDatabase().reloadItem(N,itemEntry);
};
var P=function(){Exhibit.UI.removeChildren(O);
Exhibit.EditingLens._constructDefaultValueList(R,V,O,U,N,Q);
};
var L=function(){S();
P();
};
var T=Exhibit.EditingLens.makeButton("Save",L);
var M=Exhibit.EditingLens.makeButton("Cancel",P);
O.appendChild(T);
O.appendChild(M);
};
Exhibit.UIContext.prototype.format=function(H,G,J,F){var I;
if(G in this._formatters){I=this._formatters[G];
}else{I=this._formatters[G]=new Exhibit.Formatter._constructors[G](this);
}I.format(H,J,F);
};
Exhibit.UIContext.prototype.formatList=function(I,H,G,J,F){if(this._listFormatter==null){this._listFormatter=new Exhibit.Formatter._ListFormatter(this);
}this._listFormatter.formatList(I,H,G,J,F);
};
Exhibit.LensRegistry.prototype.createLens=function(L,M,J,K){var O=this.getLens(L,J);
var R=function(A){if(O==null){A._constructDefaultUI(L,M,J);
}else{if(typeof O=="string"){A._constructFromLensTemplateURL(L,M,J,O);
}else{A._constructFromLensTemplateDOM(L,M,J,O);
}}};
var Q={};
try{if(K){Q=Exhibit.EditingLens.create(L,M,J,Q,R);
}else{Q=new Exhibit.Lens();
}}catch(P){SimileAjax.Debug.warn("Something wrong happened while building the editing lens, reverting to regular lens.");
Q=new Exhibit.Lens();
}R(Q);
if(K){var N=function(B,C){if(Exhibit.getAttribute(B,"ex:content")!=null){Exhibit.setAttribute(C,"ex:content",Exhibit.getAttributes(B,"ex:content"));
}else{for(var A=0;
A<B.childNodes.length;
A++){N(B.childNodes[A],C.childNodes[A]);
}}};
}return Q;
};
Exhibit.Lens._constructFromLensTemplateNode=function(u,q,AE,z,s,t){if(typeof AE=="string"){z.appendChild(document.createTextNode(AE));
return ;
}var m=s.getDatabase();
var w=AE.children;
if(AE.condition!=null){if(AE.condition.test=="if-exists"){if(!AE.condition.expression.testExists(u,q,"value",m)){return ;
}}else{if(AE.condition.test=="if"){if(AE.condition.expression.evaluate(u,q,"value",m).values.contains(true)){if(w!=null&&w.length>0){Exhibit.Lens._constructFromLensTemplateNode(u,q,w[0],z,s,t);
}}else{if(w!=null&&w.length>1){Exhibit.Lens._constructFromLensTemplateNode(u,q,w[1],z,s,t);
}}return ;
}else{if(AE.condition.test=="select"){var AA=AE.condition.expression.evaluate(u,q,"value",m).values;
if(w!=null){var y=null;
for(var f=0;
f<w.length;
f++){var o=w[f];
if(o.condition!=null&&o.condition.test=="case"){if(AA.contains(o.condition.value)){Exhibit.Lens._constructFromLensTemplateNode(u,q,o,z,s,t);
return ;
}}else{if(typeof o!="string"){y=o;
}}}}if(y!=null){Exhibit.Lens._constructFromLensTemplateNode(u,q,y,z,s,t);
}return ;
}}}}var r=Exhibit.Lens._constructElmtWithAttributes(AE,z,m);
if(AE.contentAttributes!=null){var e=AE.contentAttributes;
for(var h=0;
h<e.length;
h++){var n=e[h];
var AA=[];
n.expression.evaluate(u,q,"value",m).values.visit(function(A){AA.push(A);
});
r.setAttribute(n.name,AA.join(";"));
}}if(AE.subcontentAttributes!=null){var x=AE.subcontentAttributes;
for(var h=0;
h<x.length;
h++){var n=x[h];
var AD=n.fragments;
var j="";
for(var l=0;
l<AD.length;
l++){var AC=AD[l];
if(typeof AC=="string"){j+=AC;
}else{j+=AC.evaluateSingle(u,q,"value",m).value;
}}r.setAttribute(n.name,j);
}}var k=AE.handlers;
for(var g=0;
g<k.length;
g++){var AB=k[g];
r[AB.name]=AB.code;
}if(AE.control!=null){switch(AE.control){case"item-link":var c=document.createElement("a");
c.innerHTML=Exhibit.l10n.itemLinkLabel;
c.href=Exhibit.Persistence.getItemLink(u["value"]);
c.target="_blank";
r.appendChild(c);
}}else{if(AE.content!=null){var j=AE.content.evaluate(u,q,"value",m);
if(w!=null){var i={"value":j.valueType,"index":"number"};
var v=1;
var a=function(C){var A={"value":C,"index":v++};
for(var B=0;
B<w.length;
B++){Exhibit.Lens._constructFromLensTemplateNode(A,i,w[B],r,s,t);
}};
if(j.values instanceof Array){for(var h=0;
h<j.values.length;
h++){a(j.values[h]);
}}else{j.values.visit(a);
}}else{Exhibit.Lens._constructDefaultValueList(j.values,j.valueType,r,s,t.itemID,AE.content._rootNode._segments[0].property);
}}else{if(w!=null){for(var h=0;
h<w.length;
h++){Exhibit.Lens._constructFromLensTemplateNode(u,q,w[h],r,s,t);
}}}}};
Exhibit.Lens.original_constructDefaultValueList=Exhibit.Lens._constructDefaultValueList;


/* compile-epilog.js */
(function(){var f=null;
if("SimileWidgets_onLoad" in window){if(typeof SimileWidgets_onLoad=="string"){f=eval(SimileWidgets_onLoad);
SimileWidgets_onLoad=null;
}else{if(typeof SimileWidgets_onLoad=="function"){f=SimileWidgets_onLoad;
SimileWidgets_onLoad=null;
}}}if(f!=null){f();
}})();