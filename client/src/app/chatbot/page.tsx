'use client'

import { useEffect, useState, useCallback } from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import styles from '@/app/chatbot/page.module.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import userAPI from "../ApiServices/userAPI";
import { useRouter } from 'next/navigation'
import { changeAuthStatus } from "@/lib/features/authentication/authSlice";


import CircularProgress from '@mui/material/CircularProgress';


const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAIKEY
const openai = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });



const ChatBotPage = () => {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth.value);
  const user = useSelector((state: RootState) => state.user.value);

  const starterMessage = `You are a helpful assistant looking to assist the user called ${user.firstName}on any queries related to housing regulation in the uk and whether they should seek legal help. Keep your answers short.`;

  const chatBotStart = [
    {
      role: "system",
      content: starterMessage,
    }
  ]

  const [chatBotResponse, setChatBotResponse] = useState<string | null>(null);
  const [chatBotFirstMessage, setChatBotFirstMessage] = useState<string>(`Hello ${user.firstName}! I am a helpful chatbot ready to assist you with any housing regulatory questions. Please ask me a question!`)
  const [conversationHistory, setConversationHistory] = useState<any[]>(chatBotStart);
  const [spinnerFlag, setSpinnerFlag] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {

    userAPI.checkUser(dispatch).then((res) => {
      if (res === false) {
        dispatch(changeAuthStatus(false))
        router.push('/login')
      } else {
        dispatch(changeAuthStatus(true))
      }
    })

  })

  const handleMessage = async () => {
    try {
      if (userMessage !== '') {
        const newConversationHistory = [...conversationHistory, { role: "user", content: userMessage }]
        setConversationHistory([...newConversationHistory])
        setSpinnerFlag(true)
        const chatCompletion = await openai.chat.completions.create({
          messages: newConversationHistory,
          model: "gpt-3.5-turbo",
          frequency_penalty: 1,
          max_tokens: 100,
          n: 1,
          user: user.email,
        });
        if (chatCompletion.choices[0].message.content) {
          setSpinnerFlag(false)
          setConversationHistory([...newConversationHistory, { role: "assistant", content: chatCompletion.choices[0].message.content }])
          setChatBotResponse(chatCompletion.choices[0].message.content);
          setUserMessage('')
        }
      }
    } catch (error) {
      console.error('Error or max retries reached', error);
    }
  }

  return (
    <>
      <section className={styles.chatbot_page_container}>
        <div className={styles.chat_box}>
          <div className={styles.chat_bot_responses}>
            <p> {chatBotFirstMessage} </p>
          </div>
          {conversationHistory.slice(1).map((history, index) => {
            if (history.role === 'user') {
              return (
                <div className={styles.user_message_container} key={index}>
                  <div className={styles.user_messages} >
                    <p> {history.content} </p>
                  </div>
                </div>
              )
            } else if (history.role === 'assistant') {
              return (
                <div className={styles.chat_bot_responses} key={index}>
                  <p> {history.content} </p>
                </div>
              )
            }
          })}
          {spinnerFlag && (
            <div className={styles.chat_bot_responses}>
              <CircularProgress />
            </div>
          )}
        </div >
        <div className={styles.input_message_container_fixed}>
          <TextField value={userMessage} className={styles.message_input} onChange={(e) => setUserMessage(e.target.value)} variant="outlined" />
          <div className={styles.button_container}>
            <Button variant="contained" onClick={handleMessage} className={styles.send_button} endIcon={<SendIcon />}>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatBotPage