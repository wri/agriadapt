import { useInView } from 'react-intersection-observer';

const InView = (props: any) => {
  const { children, ...inViewProps } = props;
  const [ref, inView, entry] = useInView(inViewProps);

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return props.children({ inView, ref, entry });
  }

  return props.children({ inView: true });
};

export default InView;
