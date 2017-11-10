// TODO: Currently this is used for testing during development, we should refactor this out into tests
import { diffLastTwo } from './lib/diff';

const dir = 'snapshots/output/hackernews';
diffLastTwo(dir);
