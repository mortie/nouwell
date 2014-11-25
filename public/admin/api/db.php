<?php
	class Database
	{
		public function __construct($dir)
		{
			$this->dir = $dir;
		}

		public function pushFile($dir, $content)
		{
			$files = scandir("$this->dir/$dir");
			sort($files, SORT_NUMERIC);

			$index = $files[sizeof($files)-1]+1;

			file_put_contents("$this->dir/$dir/$index", json_encode($content));

			return $index;
		}

		public function pushBlob($dir, $blob, $content)
		{
			$index = $this->pushFile($dir, $content);
			$blobDir = "$this->dir/$dir.blob";
			if (!is_dir($blobDir))
				mkdir($blobDir);

			file_put_contents("$blobDir/$index", $blob);
		}

		public function rewriteFile($dir, $index, $content)
		{
			file_put_contents("$this->dir/$dir/$index", json_encode($content));
		}

		public function updateFile($dir, $index, $content)
		{
			$fileName = "$this->dir/$dir/$index";
			$original = json_decode(file_get_contents($fileName));

			foreach($content as $key=>$val)
			{
				$original->$key = $val;
			}

			file_put_contents($fileName, json_encode($original));
		}

		public function getFiles($dir)
		{
			$files = array_filter(scandir("$this->dir/$dir"), function($item)
			{
				return $item[0] !== '.';
			});

			sort($files, SORT_NUMERIC);

			$contents = [];

			foreach ($files as $index)
			{
				$fileName = "$this->dir/$dir/$index";
				$arr = json_decode(file_get_contents($fileName));
				$arr->id = $index;

				array_push($contents, $arr);
			}

			return $contents;
		}

		public function getFile($dir, $index)
		{
			$fileName = "$this->dir/$dir/$index";
			return json_decode(file_get_contents($fileName));
		}

		public function deleteFile($dir, $index)
		{
			unlink("$this->dir/$dir/$index");
		}
	}
