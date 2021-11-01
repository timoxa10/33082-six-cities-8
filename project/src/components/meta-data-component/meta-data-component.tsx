interface MetaDataComponentProps {
  title: string;
}

function MetaDataComponent(props: MetaDataComponentProps): JSX.Element {
  const { title } = props;

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </>
  );
}

export default MetaDataComponent;
