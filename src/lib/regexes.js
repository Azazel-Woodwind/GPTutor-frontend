export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const NAME_REGEX = /^[a-zA-Z\-\']+$/;
export const PASSWORD_LENGTH_REGEX = /^.{8,24}$/;
export const CONTAINS_LOWERCASE_REGEX = /[a-z]/;
export const CONTAINS_UPPERCASE_REGEX = /[A-Z]/;
export const CONTAINS_NUMBER_REGEX = /[0-9]/;
export const CONTAINS_SPECIAL_CHARACTER_REGEX = /[^A-Za-z0-9]/;

export const IMAGE_LINK_REGEX =
    /^(https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:\/[\w\-.~!$&'()*+,;=:@%]+)*\/?)(\.(?:jpe?g|png|gif|webp))$/;

export const SVG_REGEX = /^<svg\b[^>]*>((.*\n*)*?)<\/svg>$/;
