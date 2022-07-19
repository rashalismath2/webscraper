import React from "react";
import { Box} from "native-base";

export default ({message}) => {
    return (
        <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  {message}
        </Box>
    );
};
