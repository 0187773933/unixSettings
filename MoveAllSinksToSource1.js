#!/bin/bash
node -e 'const cp = require( "child_process" );
const path = require( "path" ); 
var groot = cp.spawnSync( "npm" , [ "root" , "-g" ] , { encoding : "utf8" } );
groot = groot.stdout.trim();
require( path.join( groot , "shelljs" , "global" ) );
var setDefaultSink = "pacmd set-default-sink 1";
exec( setDefaultSink , { silent:true , async:false } );
var getInputs = "pacmd list-sink-inputs | awk " + String.fromCharCode(39) + "/index:/ {print $0};" + String.fromCharCode(39);
var wInputs = exec( getInputs , { silent:true , async: false }).stdout;
wInputs = wInputs.split("\n");
for ( var i = 0; i < wInputs.length; ++i ) {
	var x1 = wInputs[i].replace(/\s/g, "");
	if ( x1.length == 0 ) { continue; }
	var x2 = x1.split(":");
	if ( !x2 ) { continue; }
	if ( x2.length == 2 && x2[0] === "index" ) {
		var wExec = "pacmd move-sink-input " + x2[1] + " 1";
		exec( wExec , { silent:true , async: false } );
	}
}
process.exit(1);'
