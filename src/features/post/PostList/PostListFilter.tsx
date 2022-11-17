import { Button, HStack } from '@chakra-ui/react';
import { AiOutlineRocket } from 'react-icons/ai';
import { TbAlertTriangle, TbFlame } from 'react-icons/tb';
import { TiStarburstOutline } from 'react-icons/ti';
import useBackground from '../../../hooks/useBackground';
import useBorder from '../../../hooks/useBorder';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';

export default function PostListFilter({
    selected,
    setSelected
}: {
    selected: string;
    setSelected: (value: string) => void;
}) {
    const background = useBackground();
    const [borderColor] = useBorder();
    const colorScheme = useButtonColorScheme();

    const handleClick = (value: string) => {
        if (value !== selected) {
            setSelected(value);
        }
    };

    return (
        <HStack
            background={background}
            align='start'
            w='full'
            borderRadius='md'
            boxShadow='md'
            border='1px'
            borderColor={borderColor}
            py={3}
            px={2}
            spacing={0}
        >
            <Button
                size='sm'
                isActive={selected === 'best'}
                leftIcon={<AiOutlineRocket />}
                colorScheme={colorScheme}
                borderRadius='full'
                onClick={() => handleClick('best')}
                variant='ghost'
            >
                Best
            </Button>
            <Button
                isActive={selected === 'hot'}
                size='sm'
                leftIcon={<TbFlame />}
                colorScheme={colorScheme}
                onClick={() => handleClick('hot')}
                borderRadius='full'
                variant='ghost'
            >
                Hot
            </Button>
            <Button
                size='sm'
                isActive={selected === 'new'}
                leftIcon={<TiStarburstOutline />}
                colorScheme={colorScheme}
                onClick={() => handleClick('new')}
                borderRadius='full'
                variant='ghost'
            >
                New
            </Button>
            <Button
                size='sm'
                isActive={selected === 'controversial'}
                leftIcon={<TbAlertTriangle />}
                colorScheme={colorScheme}
                onClick={() => handleClick('controversial')}
                borderRadius='full'
                variant='ghost'
            >
                Controversial
            </Button>
        </HStack>
    );
}
