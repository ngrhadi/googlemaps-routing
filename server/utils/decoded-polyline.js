function decodePolyline(encoded) {
  if (!encoded) {
    return [];
  }
  var poly = [];
  var index = 0, len = encoded.length;
  var lat = 0, lng = 0;

  while (index < len) {
    var b, shift = 0, result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    // eslint-disable-next-line eqeqeq
    var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    // eslint-disable-next-line eqeqeq
    var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    var p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    };
    poly.push(p);
  }
  return poly;
}

// console.log(decodePolyline("zs~d@ukpiSFaDCYH}B@g@COUeAo@qBOo@Gm@?s@b@kJ`@cINwCFoCA?A?ACCE@MBA@AA{BB}BBMXI`@@j@OdAo@f@]hAkA`@g@Ve@FOBUBqBFsGZsF\\cHPcFDyARyDDe@@a@E[K]IOIO[Kk@Mw@Gi@@m@F_AAQGSOOOHiDJkAP}Al@iBvCwGtCkGl@_BAMBKHI@Aj@eBl@iC?q@Ne@d@mBL{@AQIWWYw@k@YEUIw@m@m@a@{@g@a@IO?[DoA\\]@[GYOOUI_@?g@EyBGqAWyCKIIS@e@N{@CeD?_@q@{IUsDgAoNa@_GIkBCq@Fe@kBcVGy@cBuSi@sIwBoYQwBg@sHKs@McCw@qJi@oHaAuL[_E}Dwh@cA}N}@iLWaAMkAa@cEi@{DQoBG}BGu@WiA{AqCm@kAs@gA][a@OYE_@?m@Js@ZaBvAqBvAs@`@YL_DlDe@h@w@~@i@j@e@ZORsD`F{DtEeBzBy@`AOd@m@|@sAfBUZeBfBcBvAwAfAiB`A{@d@q@TMb@Y|@i@bCIl@~AR_BSHm@\\aBPq@`@qARqAJqARyA\\cDAcCGuBF}BH}@Lg@VEXGNKVG`@BTA\\EXMXUB[DOJEXAd@GRORm@HSPOlAK`@Ap@HZBDGNaA~@aDXgBJ_@N[Lk@Pa@JOJQJQZwAn@oAZu@^sAn@cAlDeDhAqAb@k@Xc@n@cALE`@@p@@p@INE^]`@W\\Uh@uATg@LOb@OV[n@kABKUk@DYHKf@SjAYtAa@vAk@ACCGDQJGPBB@NSH?tBVf@BJC\\eBH[HMHIt@g@bBuArAtAXRVLTHG|A]zBKl@Az@Bv@"))

module.exports = {
  decodePolyline
}
