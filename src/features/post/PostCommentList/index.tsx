import { TriangleDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, VStack } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { useState } from 'react';

export default function PostCommentList({ postId }: { postId: number }) {
    const [filter, setFilter] = useState<string>('best');
    return (
        <VStack>
            <Menu>
                <MenuButton size='xs' as={Button} rightIcon={<TriangleDownIcon />}>
                    Sort by: {capitalize(filter)}
                </MenuButton>
                <MenuList minWidth='fit-content'>
                    <MenuOptionGroup defaultValue='best' type='radio'>
                        <MenuItemOption fontSize='xs' value='best' onClick={() => setFilter('best')}>
                            Best
                        </MenuItemOption>
                        <MenuItemOption fontSize='xs' value='top' onClick={() => setFilter('top')}>
                            Top
                        </MenuItemOption>
                        <MenuItemOption fontSize='xs' value='new' onClick={() => setFilter('new')}>
                            New
                        </MenuItemOption>
                        <MenuItemOption fontSize='xs' value='controversial' onClick={() => setFilter('controversial')}>
                            Controversial
                        </MenuItemOption>
                        <MenuItemOption fontSize='xs' value='old' onClick={() => setFilter('old')}>
                            Old
                        </MenuItemOption>
                        <MenuItemOption fontSize='xs' value='q&a' onClick={() => setFilter('q&a')}>
                            Q&A
                        </MenuItemOption>
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
        </VStack>
    );
}
