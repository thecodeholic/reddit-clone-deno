--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-08-04 08:51:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 16485)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 2886 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16494)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    post_id bigint NOT NULL,
    user_id bigint NOT NULL,
    parent_id bigint,
    upvotes integer,
    create_date timestamp without time zone
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16595)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16497)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    subreddit_id bigint NOT NULL,
    title character varying(1025) NOT NULL,
    text text,
    image_video character varying(512),
    link character varying(2048),
    user_id bigint NOT NULL,
    upvotes integer,
    type character varying NOT NULL,
    create_date timestamp without time zone
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16593)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16503)
-- Name: subreddits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subreddits (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    title character varying(512) NOT NULL,
    description text,
    user_id bigint NOT NULL,
    create_date timestamp without time zone
);


ALTER TABLE public.subreddits OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16591)
-- Name: subreddits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.subreddits ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.subreddits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16506)
-- Name: subreddits_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subreddits_users (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    subreddit_id bigint NOT NULL,
    create_date timestamp without time zone
);


ALTER TABLE public.subreddits_users OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16589)
-- Name: subreddits_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.subreddits_users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.subreddits_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 207 (class 1259 OID 16509)
-- Name: upvote_downvotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.upvote_downvotes (
    id bigint NOT NULL,
    post_id bigint,
    comment_id bigint,
    user_id bigint NOT NULL,
    create_date timestamp without time zone,
    upvote boolean
);


ALTER TABLE public.upvote_downvotes OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16587)
-- Name: upvote_downvotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.upvote_downvotes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.upvote_downvotes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 208 (class 1259 OID 16512)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(512) NOT NULL,
    password character varying(512) NOT NULL,
    create_date timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16585)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2887 (class 0 OID 0)
-- Dependencies: 214
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- TOC entry 2888 (class 0 OID 0)
-- Dependencies: 213
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, false);


--
-- TOC entry 2889 (class 0 OID 0)
-- Dependencies: 212
-- Name: subreddits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subreddits_id_seq', 1, false);


--
-- TOC entry 2890 (class 0 OID 0)
-- Dependencies: 211
-- Name: subreddits_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subreddits_users_id_seq', 1, false);


--
-- TOC entry 2891 (class 0 OID 0)
-- Dependencies: 210
-- Name: upvote_downvotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upvote_downvotes_id_seq', 1, false);


--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 2721 (class 2606 OID 16519)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2723 (class 2606 OID 16521)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 2725 (class 2606 OID 16523)
-- Name: subreddits subreddits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subreddits
    ADD CONSTRAINT subreddits_pkey PRIMARY KEY (id);


--
-- TOC entry 2727 (class 2606 OID 16525)
-- Name: subreddits_users subreddits_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subreddits_users
    ADD CONSTRAINT subreddits_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2729 (class 2606 OID 16527)
-- Name: upvote_downvotes upvote_downvotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upvote_downvotes
    ADD CONSTRAINT upvote_downvotes_pkey PRIMARY KEY (id);


--
-- TOC entry 2731 (class 2606 OID 16529)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2737 (class 2606 OID 16530)
-- Name: subreddits FK_subreddits_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subreddits
    ADD CONSTRAINT "FK_subreddits_users" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2732 (class 2606 OID 16535)
-- Name: comments comments_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.comments(id) NOT VALID;


--
-- TOC entry 2733 (class 2606 OID 16540)
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 2734 (class 2606 OID 16545)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2735 (class 2606 OID 16550)
-- Name: posts posts_subreddit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_subreddit_id_fkey FOREIGN KEY (subreddit_id) REFERENCES public.subreddits(id);


--
-- TOC entry 2736 (class 2606 OID 16555)
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2738 (class 2606 OID 16560)
-- Name: subreddits_users subreddits_users_subreddit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subreddits_users
    ADD CONSTRAINT subreddits_users_subreddit_id_fkey FOREIGN KEY (subreddit_id) REFERENCES public.subreddits(id);


--
-- TOC entry 2739 (class 2606 OID 16565)
-- Name: subreddits_users subreddits_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subreddits_users
    ADD CONSTRAINT subreddits_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2740 (class 2606 OID 16570)
-- Name: upvote_downvotes upvote_downvotes_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upvote_downvotes
    ADD CONSTRAINT upvote_downvotes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id);


--
-- TOC entry 2741 (class 2606 OID 16575)
-- Name: upvote_downvotes upvote_downvotes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upvote_downvotes
    ADD CONSTRAINT upvote_downvotes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 2742 (class 2606 OID 16580)
-- Name: upvote_downvotes upvote_downvotes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upvote_downvotes
    ADD CONSTRAINT upvote_downvotes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2020-08-04 08:51:03

--
-- PostgreSQL database dump complete
--

