export function getStrapiMedia(url: string) {
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    return `${
        import.meta.env.VITE_NEXT_PUBLIC_STRAPI_API_URL ||
        'http://localhost:1337'
    }${url}`;
}
