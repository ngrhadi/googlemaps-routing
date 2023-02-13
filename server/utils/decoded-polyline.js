const { decode } = require('@googlemaps/polyline-codec')

// function decodePolyline(encoded) {
//   if (!encoded) {
//     return [];
//   }
//   var poly = [];
//   var index = 0, len = encoded.length;
//   var latitude = 0, longitude = 0;

//   while (index < len) {
//     var b, shift = 0, result = 0;

//     do {
//       b = encoded.charCodeAt(index++) - 63;
//       result = result | ((b & 0x1f) << shift);
//       shift += 5;
//     } while (b >= 0x20);

//     // eslint-disable-next-line eqeqeq
//     var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
//     latitude += dlat;

//     shift = 0;
//     result = 0;

//     do {
//       b = encoded.charCodeAt(index++) - 63;
//       result = result | ((b & 0x1f) << shift);
//       shift += 5;
//     } while (b >= 0x20);

//     // eslint-disable-next-line eqeqeq
//     var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
//     longitude += dlng;

//     var p = {
//       lat: longitude / 1e5,
//       lng: latitude / 1e5,
//     };
//     poly.push(p);
//   }
//   return poly;
// }

// console.log(decodePolyline("zs~d@ukpiSFaDCYH}B@g@COUeAo@qBOo@Gm@?s@b@kJ`@cINwCFoCA?A?ACCE@MBA@AA{BB}BBMXI`@@j@OdAo@f@]hAkA`@g@Ve@FOBUBqBFsGZsF\\cHPcFDyARyDDe@@a@E[K]IOIO[Kk@Mw@Gi@@m@F_AAQGSOOOHiDJkAP}Al@iBvCwGtCkGl@_BAMBKHI@Aj@eBl@iC?q@Ne@d@mBL{@AQIWWYw@k@YEUIw@m@m@a@{@g@a@IO?[DoA\\]@[GYOOUI_@?g@EyBGqAWyCKIIS@e@N{@CeD?_@q@{IUsDgAoNa@_GIkBCq@Fe@kBcVGy@cBuSi@sIwBoYQwBg@sHKs@McCw@qJi@oHaAuL[_E}Dwh@cA}N}@iLWaAMkAa@cEi@{DQoBG}BGu@WiA{AqCm@kAs@gA][a@OYE_@?m@Js@ZaBvAqBvAs@`@YL_DlDe@h@w@~@i@j@e@ZORsD`F{DtEeBzBy@`AOd@m@|@sAfBUZeBfBcBvAwAfAiB`A{@d@q@TMb@Y|@i@bCIl@~AR_BSHm@\\aBPq@`@qARqAJqARyA\\cDAcCGuBF}BH}@Lg@VEXGNKVG`@BTA\\EXMXUB[DOJEXAd@GRORm@HSPOlAK`@Ap@HZBDGNaA~@aDXgBJ_@N[Lk@Pa@JOJQJQZwAn@oAZu@^sAn@cAlDeDhAqAb@k@Xc@n@cALE`@@p@@p@INE^]`@W\\Uh@uATg@LOb@OV[n@kABKUk@DYHKf@SjAYtAa@vAk@ACCGDQJGPBB@NSH?tBVf@BJC\\eBH[HMHIt@g@bBuArAtAXRVLTHG|A]zBKl@Az@Bv@"))

function decodedPoly2(encoded) {
  let poly = decode(encoded, 5);
  let value = []
  for (let i = 0; i < poly.length; i++) {
    var data = {
      lat: poly[i][1],
      lng: poly[i][0],
    }
    value.push(data);
  }
  return value;
}

// console.log(decodedPoly2("xemd@ihngSm@`B}@`CYKy@[uDiA{EyAiBg@{Bi@qHkAeFo@WM[EgBWa@zCMlAGd@SxCGdDKzHGpHKzEOpFQtHWhIIpADZIjDMlCx@X`Bd@fAZlMfDzCx@pCr@zEnAjG`B~@XtDbAhHfBpAVx@HvAD`DDlA?dAF^NVTHNf@nALRHNHPHFd@PbBb@v@ZnAZrBl@nDdAl@Xt@b@j@Zp@h@b@LP@lAEXAh@F`B`@lIfCbDdAzAd@nK`DjEzAxCz@j@TbAZdCz@`ExAxBt@bDrA|FrBxBv@|Aj@jN|E|GhChEdBjBj@hCz@xCdAzGhCtGdCxItBhDx@jCb@bPvCnEx@|J`BrFz@nHdA`Db@OhBEbAAh@Q|AUpCIp@@RFPDVA\\OhAIn@Uv@g@pCOt@i@xA]x@g@|AAX?jBdGx@vMlBtEz@p@PZRh@TJGJYj@B^LLJ^NJ@JEJCrB`@h@?"
// ))

module.exports = {
  // decodePolyline,
  decodedPoly2
}
