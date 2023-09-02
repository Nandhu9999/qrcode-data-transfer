import * as React from "react";

export default ({children}) => (
  <div style={{width:"100%",height:"100%",display:"flex", justifyContent:"space-between"}}>
        <span>
          <button>[--]</button>
        </span>
        <span>
            {children}
        </span>
        <span><button>[--]</button></span>
  </div>
);
