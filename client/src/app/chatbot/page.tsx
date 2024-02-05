'use client'

import { useEffect, useState, useCallback } from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

import OpenAI from "openai";
import _ from 'lodash';

import styles from '@/app/chatbot/page.module.css'
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import userAPI from "../ApiServices/userAPI";
import { useRouter } from 'next/navigation'

import CircularProgress from '@mui/material/CircularProgress';






const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAIKEY
const openai = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });

interface chatBot {
  role: string;
  content: string;
}


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
  const [conversationHistory, setConversationHistory] = useState<chatBot[]>(chatBotStart);
  const [inputContainerClass, setInputContainerClass] = useState(styles.input_message_container_fixed);

  const [spinnerFlag, setSpinnerFlag] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>('');



  useEffect(() => {
    const checkUser = async () => {
      await userAPI.checkUser()
    }
    checkUser()
    if (!auth) {
      router.push('/login')
    }
  })

  useEffect(() => {
    const chatBoxElement = document.querySelector('.' + styles.chat_box);
    if (chatBoxElement) {
      if (chatBoxElement.scrollHeight > chatBoxElement.clientHeight) {
        setInputContainerClass(styles.input_message_container_relative);
      } else {
        setInputContainerClass(styles.input_message_container_fixed);
      }
    }
  }, [conversationHistory]);

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
          <div className={styles.user_message_container}>
            <div className={styles.user_messages}>
              <p> {chatBotFirstMessage} </p>
            </div>
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
        <div className={styles.input_message_container}>
          <TextField value={userMessage} className={styles.message_input} onChange={(e) => setUserMessage(e.target.value)} variant="outlined" />
          <div className={styles.button_container}>
            <Button variant="contained" onClick={handleMessage} className={styles.send_button} endIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatBotPage