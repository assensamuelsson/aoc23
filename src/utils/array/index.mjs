function* uniquePairs (array) {
  for (let ia = 0; ia < array.length - 1; ia++) {
    for (let ib = ia + 1; ib < array.length; ib++) {
      yield [array[ia], array[ib]];
    }
  }
}

export default {
  uniquePairs,
}
