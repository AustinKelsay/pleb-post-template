import { bech32 } from "bech32";

export function encodeLnurl(string) {
  // Encode the string to a bech32 lnurl
  const words = bech32.toWords(Buffer.from(string, "utf8"));
  // Return the encoded lnurl
  return bech32.encode("lnurl", words, Number.MAX_SAFE_INTEGER);
}

export function decodeLnurl(string) {
  // Decode the lnurl to a string
  const words = bech32.toWords(Buffer.from(string, "utf8"));
  // Return the decoded string
  return bech32.decode("lnurl", words, Number.MAX_SAFE_INTEGER);
}
