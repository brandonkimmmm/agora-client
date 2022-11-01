import { CheckCircleIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { PASSWORD_REGEX } from '../../../config/constants';

enum CheckTypes {
    LENGTH = 'LENGTH',
    DIGIT = 'DIGIT',
    SPECIAL_CHARACTER = 'SPECIAL_CHARACTER',
    UPPERCASE = 'UPPERCASE',
    LOWERCASE = 'LOWERCASE',
    VALID_CHARACTERS = 'VALID_CHARACTERS'
}

const checks: { type: CheckTypes; description: string }[] = [
    {
        type: CheckTypes.VALID_CHARACTERS,
        description: 'Only has letters, numbers, and special characters !@#$%^&*'
    },
    {
        type: CheckTypes.LENGTH,
        description: 'Has 8 to 20 characters'
    },
    {
        type: CheckTypes.UPPERCASE,
        description: 'Has at least one uppercase letter'
    },
    {
        type: CheckTypes.LOWERCASE,
        description: 'Has at least one lowercase letter'
    },
    {
        type: CheckTypes.DIGIT,
        description: 'Has at least one digit'
    },
    {
        type: CheckTypes.SPECIAL_CHARACTER,
        description: 'Has at least one special charcter'
    }
];

export default function SignupPasswordCheck({ password }: { password: string }) {
    const getCheckColor = (type: CheckTypes) => {
        if (!password) return 'gray';
        return PASSWORD_REGEX[type].test(password) ? 'green.400' : 'red.400';
    };

    return (
        <VStack pt={2} align='start' w='full'>
            {checks.map(({ type, description }) => (
                <HStack align='center' key={type}>
                    <Icon h={3} as={CheckCircleIcon} color={getCheckColor(type)} />
                    <Text fontSize='xs'>{description}</Text>
                </HStack>
            ))}
        </VStack>
    );
}
