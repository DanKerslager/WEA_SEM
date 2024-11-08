import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Box,
  Button,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { createComment } from '../api';
import { useAuth } from '../providers/AuthProvider';

const Comments = ({ bookId, comments, commentCreated, setCommentCreated }) => {
  const [error, setError] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    //refresh textarea
    document.getElementById('text').value = '';
    try {
      let text = data.text;
      //Get username from cookies
      let username = user.username;
      let comment = await createComment({ bookId, text, username });
      setCommentCreated((prev) => !prev);
    } catch (err) {
      setError(err.message);
    }
  };
  if (isAuthenticated) {
    return (
      <>
        <Text fontSize="2xl">
          {t('comments')}: {comments?.length || 0}
        </Text>
        {isAuthenticated ? (
          <form onSubmit={handleSubmit(onSubmit)} id="comment-post">
            <Textarea
              id="text"
              onClick={() => setShowButtons(true)}
              placeholder="Write a comment"
              {...register('text', {
                required: 'Write a comment',
              })}
            />
            {showButtons && (
              <>
                <Button
                  mt={3}
                  colorScheme="teal"
                  variant="outline"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {t('comment')}
                </Button>
                <Button
                  ml={3}
                  mt={3}
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => setShowButtons(false)}
                >
                  {t('cancel')}
                </Button>
              </>
            )}
          </form>
        ) : (
          <>
            <p>Sign up to see comments.</p>
          </>
        )}

        <Box id="comments">
          {comments?.map((comment, index) => (
            <Box key={index} id="comment">
              <div>
                <Text>{comment.user}</Text>
                <Text>{comment.createdAt}</Text>
              </div>
              <p>{comment.text}</p>
            </Box>
          ))}
        </Box>
      </>
    );
  }
};
export default Comments;
