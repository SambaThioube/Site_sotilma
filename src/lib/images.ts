// Doit rester synchronisé avec les remotePatterns de next.config.ts :
// next/image lève une exception fatale pour un hostname non autorisé,
// ce qui casse toute la page si une donnée backend contient une URL invalide.
const ALLOWED_IMAGE_HOSTS = new Set([
  "static.wixstatic.com",
  "www.the-land.bzh",
  "media.istockphoto.com",
  "previews.123rf.com",
  "aesie.net",
  "twovwpczvblgjdxoyday.supabase.co",
]);

export function isAllowedImageSrc(src: string): boolean {
  try {
    return ALLOWED_IMAGE_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}
