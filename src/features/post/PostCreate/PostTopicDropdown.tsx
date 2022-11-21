import { Box, Editable, EditableInput, EditablePreview, useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useLazyGetTopicsAvailableQuery } from '../../../api/topic';

export default function PostTopicDropdown() {
    const [trigger, { data, isLoading, isFetching }] = useLazyGetTopicsAvailableQuery();
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce<string>(search, 300);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const ref = useRef(null);

    useOutsideClick({
        ref,
        handler: () => (isOpen ? onClose() : null)
    });

    // useEffect(() => {
    //     (async () => {
    //         if (debouncedSearch.length > 2) {
    //             await trigger({ search: debouncedSearch });
    //         }
    //     })();
    // }, [debouncedSearch, trigger]);

    const searchResults = () => {
        return <Box>HI</Box>;
    };

    return (
        <Editable ref={ref} defaultValue='Choose a community' onClick={() => (!isOpen ? onOpen() : null)}>
            <EditablePreview />
            <EditableInput />
            {isOpen && searchResults()}
        </Editable>
    );

    // return (
    //     <Popover
    //         isOpen={isOpen}
    //         initialFocusRef={firstFieldRef}
    //         onOpen={onOpen}
    //         onClose={onClose}
    //         placement='auto'
    //         closeOnBlur
    //         closeOnEsc
    //     >
    //         <PopoverTrigger>
    //             <Editable defaultValue='Choose a community'>
    //                 <EditablePreview />
    //                 <EditableInput />
    //             </Editable>
    //         </PopoverTrigger>
    //         <PopoverContent py={2}>
    //             <FocusLock returnFocus persistentFocus={false}>
    //                 <PopoverArrow />
    //                 <TextInput
    //                     size='sm'
    //                     px={2}
    //                     placeholder='Search by name, email, or username'
    //                     variant='unstyled'
    //                     ref={firstFieldRef}
    //                     value={search}
    //                     onChange={(e) => setSearch(e.target.value)}
    //                 />
    //                 <Divider my={3} />
    //                 <Box px={2}>{searchResults()}</Box>
    //             </FocusLock>
    //         </PopoverContent>
    //     </Popover>
    // );
}
