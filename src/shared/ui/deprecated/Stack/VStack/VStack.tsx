import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
* Устарел, используем новые компоненты из папки redesigned
* @deprecated
*/
export const VStack = (props: HStackProps) => {
    return <Flex direction="column" {...props} />;
};
