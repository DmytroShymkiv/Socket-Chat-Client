const BuildProviderTree = (providers) => {
  if (providers.length === 1) {
    return providers[0];
  }
  const A = providers.shift();
  const B = providers.shift();
  return BuildProviderTree([
    ({ children }) => (
      <A>
        <B>{children}</B>
      </A>
    ),
    ...providers,
  ]);
};

export default BuildProviderTree;
