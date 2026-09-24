import { store } from '../../config/store.config';
import { Icon } from './Icons';

export default function RotatingSeal() {
  return (
    <div className="relative h-36 w-36 text-fg" role="img" aria-label={store.seal.replace(/·/g, ',')}>
      <svg viewBox="0 0 200 200" className="seal-spin absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="15" fill="currentColor" style={{ fontFamily: 'var(--font-body)' }}>
          <textPath href="#seal-circle" textLength="482" lengthAdjust="spacing">{store.seal}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
        <Icon.flower width={30} height={30} />
      </div>
    </div>
  );
}