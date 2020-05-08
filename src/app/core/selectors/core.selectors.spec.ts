import * as fromCore from '../reducers/core.reducer';
import { selectCoreState } from './core.selectors';

describe('Core Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCoreState({
      [fromCore.coreFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
