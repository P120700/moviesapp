import { Image as ExpoImage } from 'expo-image';

const IMAGE_BLURHASH = 'LKN]Rv%2Tw=w]~RBVZRi};RPxuwH';

export const Image = (props: ExpoImage['props']) => (
  <ExpoImage
    contentFit='fill'
    placeholder={{ blurhash: IMAGE_BLURHASH }}
    transition={300}
    {...props}
  />
);
